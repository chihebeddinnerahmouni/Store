import PageTitle from "../../components/ui/PageTitle";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/products/magasins/ButtonsCont";
import TableMagasin from "../../containers/products/magasins/TableMagasin";
import IMagasin from "../../types/magasin";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";


const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => { 
  const {data} = await axios.get<{entrepots: IMagasin[]}>(`${url}/api/entreports`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const newArray = data.entrepots.map((item: any) => {
    return {
      code_magasin: item.code_entreport,
      nom_de_magasin: item.name,
      description: item.description,
      created_by: item.created_by,
      updated_at: item.updated_at,
      created_at: item.created_at,
      id: item.id,
    };
  });
  return newArray;
  // return data.entrepots;
}



const Magasins = () => {
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Produits["Magasins"]) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["magasins"],
    queryFn: fetchData,
  })


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Magasins" />
      <ButtonsCont data={data} columns={columns_test} refetch={refetch} />
      <TableMagasin data={data} columns={columns_test} refetch={refetch} />
    </div>
  );
};

export default Magasins;

const columns_test: (keyof IMagasin)[] = ["code_magasin", "nom_de_magasin"];
