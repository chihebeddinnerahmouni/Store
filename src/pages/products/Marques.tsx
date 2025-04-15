import PageTitle from "../../components/ui/PageTitle";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/products/marques/ButtonsCont";
import TableMarques from "../../containers/products/marques/TableMarques";
import IMArque from "../../types/marque";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => { 
  const { data } = await axios.get<{brands: IMArque[]}>(`${url}/api/brands`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.brands;
}



const Marques = () => {
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Produits["Marques"]) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["brands"],
    queryFn: fetchData,
  })

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Marques" />
      <ButtonsCont data={data || []} columns={columns_test} refetch={refetch} />
      <TableMarques
        data={data || []}
        columns={columns_test}
        refetch={refetch}
      />
    </div>
  );
};

export default Marques;

const columns_test: (keyof IMArque)[] = ["code_brand", "name_brand"];
