import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/products/unite/ButtonsCont";
import TableUnite from "../../containers/products/unite/TableUnite";

interface DataItem {
  id: number;
    nom_court: string;
    nom_de_unité: string;
    unité_de_base: string;
}

const Unite = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [columns, setColumns] = useState<(keyof DataItem)[]>([]);
  useEffect(() => {
    setData(data_test);
    setColumns(columns_test);
  }, []);
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Unité" />
      <ButtonsCont data={data} columns={columns} />
      <TableUnite data={data} columns={columns} />
    </div>
  );
};

export default Unite;

const columns_test: (keyof DataItem)[] = ["nom_court", "nom_de_unité", "unité_de_base"];



const data_test = [
  {
    id: 1,
    nom_court: "U001",
    nom_de_unité: "Unité 1",
    unité_de_base: "Unité 1",
  },
  {
    id: 2,
        nom_court: "U002",
        nom_de_unité: "Unité 2",
        unité_de_base: "Unité 2",
    },
];