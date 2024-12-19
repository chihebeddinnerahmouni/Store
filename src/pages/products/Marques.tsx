import PageTitle from "../../components/ui/PageTitle";
import { useState, useEffect } from "react";
import ButtonsCont from "../../containers/products/marques/ButtonsCont";
import TableMarques from "../../containers/products/marques/TableMarques";

interface DataItem {
  id: number;
  code_de_marque: string;
  nom_de_marque: string;
}

const Marques = () => {

    const [data, setData] = useState<DataItem[]>([]);
    const [columns, setColumns] = useState<(keyof DataItem)[]>([]);
    useEffect(() => { 
        setData(data_test);
        setColumns(columns_test);
    }
    , []);
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Marques" />
          <ButtonsCont data={data} columns={columns} />
          <TableMarques data={data} columns={columns} />
    </div>
  );
}

export default Marques

const columns_test: (keyof DataItem)[] = ["code_de_marque", "nom_de_marque"];
 
const data_test = [
  {
    id: 1,
    code_de_marque: "M001",
    nom_de_marque: "Marque 1",
  },
  {
    id: 2,
    code_de_marque: "M002",
    nom_de_marque: "Marque 2",
  },
];
