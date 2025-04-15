import { useEffect, useContext } from "react";
import axios from "axios";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/fournisseurs/ButtonsCont";
import TableFournis from "../../../containers/raports/fournisseurs/TableFournis";
import { IProviderTable } from "../../../types/rapport/fournisseur/fournisseur";
import { PrivilegesContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IProvider } from "../../../types/rapport/fournisseur/fournisseur";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const { data } = await axios.get<{ providers: IProvider[]; global_total: number}>(
    url + "/api/reports/providers/report",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
}

const Fournisseurs = () => {
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport Fournisseur"]) navigate("/tableau-de-bord");
  }, []);

  const { data } = useSuspenseQuery({
    queryKey: ["providers-report"],
    queryFn: fetchData,
  })


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de fournisseurs" />
      <ButtonsCont columns={columns} data={data.providers} />
      <h2 className="text-xl font-bold mt-5 lg:text-2xl lg:mt-10">
        Total : {data.global_total} DA
      </h2>
      <TableFournis columns={columns} rows={createNewArray(data.providers)} />
    </div>
  );
};

export default Fournisseurs;

const columns: (keyof IProviderTable)[] = [
    "fournisseur",
    "téléphone",
    "total achats",
    "coût total",
];

const createNewArray = (data: IProvider[]) => {
  return data.map((item: IProvider) => {
    return {
      ...item,
        fournisseur: item.provider_name,
        téléphone: item.provider_phone,
        "total achats": item.total_achats,
        "coût total": item.total_cost
    };
  });
};
