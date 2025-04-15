import PageTitle from "../../components/ui/PageTitle";
import IFournisseures from "../../types/fournisseures";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/gens/fournisseures/ButtonCont";
import TableFournis from "../../containers/gens/fournisseures/TableFournis";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL;
const fetchData = async () => {
  const { data } = await axios.get<{ providers: IFournisseures[] }>(
    `${url}/api/providers`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const newData = modifiedData(data.providers);
  return newData;
};

const Fournisseurs = () => {
  // const [columns, setColumns] = useState<string[]>([]);
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Gens.Fournisseurs) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["providers"],
    queryFn: fetchData,
  });

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Gestion Du Fournisseurs" />
      <ButtonsCont data={data} columns={columns_test} refetch={refetch} />
      <TableFournis rows={data} columns={columns_test} refetch={refetch} />
    </div>
  );
};

export default Fournisseurs;

const columns_test = ["id", "nom"];
const modifiedData = (providers: IFournisseures[]) => {
  return providers.map((provider) => ({
    ...provider,
    nom: provider.name,
    téléphone: provider.phone,
    total_dette: provider.outstanding_balance,
  }));
};
