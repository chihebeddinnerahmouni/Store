import Loading from "../../../components/ui/Loading";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import IInventaire from "../../../types/rapport/inventaire/inventaire";
import { IIventaireTable } from "../../../types/rapport/inventaire/inventaire";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/inventaire/ButtonsCont";
import MagasinSelect from "../../../containers/raports/MagasinSelect";
import TableInventaire from "../../../containers/raports/inventaire/TableInventaire";
import { PrivilegesContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../../helper/axios_error";

const Inventaire = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IInventaire[]>([]);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const url = import.meta.env.VITE_BASE_URL as string;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport inventaire"])
      navigate("/tableau-de-bord");

    setLoading(true);
    axios
      .get(url + "/api/entreports/authorized/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((magasins: any) => {
        setMagasinsArray(magasins.data.entrepots);
        setMagasinId(magasins.data.entrepots[0].id);
      })
      .catch((err) => {
        setLoading(false);
        handleAxiosError(err);
      });
  }, []);

  useEffect(() => {
    if (magasinId === 0) {
      return;
    }
    setLoading(true);
    axios
      .get(url + "/api/reports/inventory/" + magasinId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        const newArrayAchats = createNewArrayAchats(res.data.inventory);
        setData(newArrayAchats);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        handleAxiosError(err);
      });
  }, [magasinId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport d'inventaire" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row md:justify-between">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray}
        />
        <ButtonsCont columns={columnsAchats} data={data} />
      </div>
      <TableInventaire columns={columnsAchats} rows={data} />
    </div>
  );
};

const columnsAchats: (keyof IIventaireTable)[] = [
  "code",
  "désignation",
  "catégorie",
  "stock_actuel",
];

const createNewArrayAchats = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      // code: item.code_barre,
      désignation: item.product_name,
      catégorie: item.category_name,
      stock_actuel: item.stock_actual,
    };
  });
};

export default Inventaire;
