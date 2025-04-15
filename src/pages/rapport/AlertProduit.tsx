import { useState, useEffect, useContext } from "react";
import axios from "axios";
import IAlerte from "../../types/rapport/alerts/alert_quantite";
import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/raports/alerte/ButtonsCont";
import MagasinSelect from "../../containers/raports/MagasinSelect";
import TableAlerte from "../../containers/raports/alerte/TableAlerte";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import IMagasin from "../../types/magasin";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async (magasinId: number) => {
  const { data } = await axios.get<{ alerts: IAlerte[] }>(
    `${url}/api/reports/stock-alerts/${magasinId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data.alerts;
};

const fetchMagasins = async () => {
  const { data } = await axios.get<{ entrepots: IMagasin[] }>(
    `${url}/api/entreports/authorized/get`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data.entrepots;
};

const AlertProduit = () => {
  const [magasinId, setMagasinId] = useState<number>(0);
  const [columns, setColumns] = useState<string[]>([]);

  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Alertes De Quantité De Produits"]) navigate("/tableau-de-bord");
  }, []);

  const { data: magasinsArray, isSuccess } = useSuspenseQuery({
    queryKey: ["authorised_magasins"],
    queryFn: fetchMagasins,
  });

  const { data, refetch, isSuccess: isDataSuccess } = useQuery({
    queryKey: ["alerts", magasinId],
    queryFn: () => fetchData(magasinId),
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) setMagasinId(magasinsArray[0].id);
   }, [isSuccess]);

  useEffect(() => {
    if (isDataSuccess && data) {
      if (data.length === 0) return setColumns([]);      
      const newColumns = Object.keys(data[0]).filter((key) => key !== "id");
      setColumns(newColumns);
    }
  }, [isDataSuccess]);

  useEffect(() => {
    if (magasinId !== 0) refetch();
  }, [magasinId]);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Alertes de quantité de produits" />
      <div className="w-full flex flex-col gap-5 items-center bgred-200 md:flex-row">
        <MagasinSelect
          value={magasinId}
          setValue={setMagasinId}
          options={magasinsArray || []}
        />
        <ButtonsCont columns={columns || []} data={data ?? []} />
      </div>
      <TableAlerte columns={columns || []} rows={data ?? []} />
    </div>
  );
};

export default AlertProduit;
