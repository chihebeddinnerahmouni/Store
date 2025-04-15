import PageTitle from "../../components/ui/PageTitle";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/products/unite/ButtonsCont";
import TableUnite from "../../containers/products/unite/TableUnite";
import IUnite from "../../types/unite";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";


const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => { 
  const { data } = await axios.get<{units: IUnite[]}>(`${url}/api/units`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.units;
}



const Unite = () => {

  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);


  useEffect(() => {
        if (!privileges.Produits["Unité"]) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["units"],
    queryFn: fetchData,
  })





  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Unité" />
      <ButtonsCont data={data || []} columns={columns_test} refetch={refetch} />
      <TableUnite data={data || []} columns={columns_test} refetch={refetch} />
    </div>
  );
};

export default Unite;

const columns_test: (keyof IUnite)[] = ["code_unit", "name_unit"];
