import Loading from "../../components/ui/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import IAlerte from "../../types/rapport/alert_quantite";
import { IAlerteTAble } from "../../types/rapport/alert_quantite";
import { enqueueSnackbar } from "notistack";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/raports/alerte/ButtonsCont";
import MagasinSelect from "../../containers/raports/alerte/MagasinSelect";
import TableAlerte from "../../containers/raports/alerte/TableAlerte";


const AlertProduit = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAlerte[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    Promise.all([
      axios.get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      // axios.get(url + "/api/reports/stock-alerts/" + magasinId , {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }),
    ])
      .then(
        axios.spread(
          (
            // data,
            magasins
          ) => {
            // console.log(magasins.data.entrepots);
            const newArray = createNewArray(data_test);
            setData(newArray);
            setMagasinsArray(magasins.data.entrepots);
            setLoading(false);
          }
        )
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });

    // fetshData()
    // const timer = setTimeout(() => {
    //   const newArray = createNewArray(data)
    //   setData(newArray);
    //   setLoading(false)
    // }, 1000)
    // return () => clearTimeout(timer)
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Alertes de quantité de produits" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <ButtonsCont columns={columns} data={data} />
      </div>
      <TableAlerte columns={columns} rows={data} />
    </div>
  );
};

export default AlertProduit;

const columns: (keyof IAlerteTAble)[] = [
  "code_produit",
  "produit",
  "magasin",
  "quantité",
  "quantité_alert",
];

// const data: IAlerte[] = [
const data_test = [
  {
    id: 11,
    name: "toyota",
    code_barre: "8345588766",
    category_id: 2,
    brand_id: 1,
    unit_id: 1,
    rayonage_id: 2,
    tax_percentage: "0.00",
    description: "hh",
    price_buy: "7000.00",
    price_sell: "9000.00",
    stock_alert: 30,
    quantity: 13,
    has_serial_number: 1,
    created_by: 2,
    updated_by: null,
    deleted_by: null,
    created_at: "2024-12-24T16:39:42.000000Z",
    updated_at: "2024-12-24T16:39:42.000000Z",
    // table
    // "code_produit": "8345588766",
    // "produit": "toyota",
    // "magasin": "testjhjlhj",
    // "quantité": 13,
    // "quantité_alert": 30,
    category: {
      id: 2,
      code_category: "TS",
      name_category: "test",
      description: "test",
      status: "active",
      deleted_by: null,
      created_by: 2,
      updated_by: null,
      created_at: "2024-12-24T16:34:03.000000Z",
      updated_at: "2024-12-24T16:34:03.000000Z",
    },
    brand: {
      id: 1,
      code_brand: "BR001",
      name_brand: "Brand Name",
      description: "Brand description",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:18:46.000000Z",
      updated_at: "2024-12-24T11:18:46.000000Z",
    },
    unit: {
      id: 1,
      code_unit: "KG",
      name_unit: "Kilogram",
      description: "Unit of mass",
      created_by: 1,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T11:27:08.000000Z",
      updated_at: "2024-12-24T11:27:08.000000Z",
    },
    rayonage: {
      id: 2,
      code_location: "test",
      name: "testjhjlhj",
      description: "test",
      created_by: 2,
      updated_by: null,
      deleted_by: null,
      created_at: "2024-12-24T16:34:58.000000Z",
      updated_at: "2024-12-24T16:34:58.000000Z",
    },
  },
];

const createNewArray = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      code_produit: item.code_barre,
      produit: item.name,
      magasin: item.rayonage.name,
      quantité: item.quantity,
      quantité_alert: item.stock_alert,
    };
  });
};
