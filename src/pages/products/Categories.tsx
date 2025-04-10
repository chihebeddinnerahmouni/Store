import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/products/categories/ButtonsCont";
import { useEffect, useContext } from "react";
import TableCategories from "../../containers/products/categories/TableCategories";
import axios from "axios";
import ICategory from "../../types/category";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const { data } = await axios.get<{ categories: ICategory[] }>(
    `${url}/api/categories`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data.categories;
};

const Categories = () => {
  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.Produits["Categories"]) navigate("/tableau-de-bord");
  }, []);

  const { data, refetch } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: fetchData,
  })

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Categories" />
      <ButtonsCont data={data} columns={columns_test} refetch={refetch} />
      <TableCategories data={data} columns={columns_test} />
    </div>
  );
};

export default Categories;

const columns_test: (keyof ICategory)[] = [
  "code_category",
  "name_category",
];
