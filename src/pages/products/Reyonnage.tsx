import PageTitle from "../../components/ui/PageTitle";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/products/rayonnage/ButtonsCont";
import TableReyon from "../../containers/products/rayonnage/TableReyon";
import IReyonnage from "../../types/reyonnage";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const { data } = await axios.get<{ rayonages: IReyonnage[] }>(
    `${url}/api/rayonages`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data.rayonages;
};



const Reyonnage = () => {
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Produits["Reyonnage"]) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["rayonages"],
    queryFn: fetchData,
  }); 


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rayonage" />
      <ButtonsCont data={data} columns={columns_test} refetch={refetch} />
      <TableReyon data={data} columns={columns_test} refetch={refetch} />
    </div>
  );
};

export default Reyonnage;

const columns_test: (keyof IReyonnage)[] = ["name", "code_location"];