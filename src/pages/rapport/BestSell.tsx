import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ButtonsCont from "../../containers/raports/best sell/ButtonsCont";
import TableVente from "../../containers/raports/best sell/TableVente";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IBestSell } from "../../types/rapport/best sell/best_sell";
import { IBestSellTable } from "../../types/rapport/best sell/best_sell";


const BestSell = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IBestSell[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);

  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${url}/api/reports/products/best-sellers?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const newArrayAchats = createNewArrayAchats(
          response.data.best_selling_products
        );
        setData(newArrayAchats);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle
        text="Produits les plus vendus"
      />
      <div className="w-full">
        <ButtonsCont
          columns={columns}
          data={data}
        />
        <DatesCont
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <TableVente columns={columns} rows={data} />
      </div>
    </div>
  );
};

const columns: (keyof IBestSellTable)[] = [
  "produit",
  "code",
  "quantité vendue",
  "total",
];


const createNewArrayAchats = (data: IBestSell[]) => {
  return data.map((item: IBestSell) => {
    return {
      ...item,
      id: item.product_id,
      produit: item.product_name,
      code: item.product_code,
      "quantité vendue": item.total_quantity_sold,
      total: item.total_sales_cost,
    };
  });
};


export default BestSell;
