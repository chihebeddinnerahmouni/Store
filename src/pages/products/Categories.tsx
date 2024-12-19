import PageTitle from "../../components/ui/PageTitle";
import ButtonsCont from "../../containers/products/categories/ButtonsCont";
import { useState, useEffect } from "react";
import TableCategories from "../../containers/products/categories/TableCategories";

interface Category {
    id: number;
    code_category: string;
    nom_de_categorie: string;
}

const Categories = () => {
    const [data, setData] = useState<Category[]>([]);
    const [columns, setColumns] = useState<(keyof Category)[]>([]);

    useEffect(() => { 
        setData(data_test);
        setColumns(columns_test);
    }, []);

    return (
        <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
            <PageTitle text="Categories" />
            <ButtonsCont
                data={data}
                columns={columns}
            />
            <TableCategories
                data={data}
                columns={columns}
            />
        </div>
    );
}

export default Categories;

const columns_test: (keyof Category)[] = ["code_category", "nom_de_categorie"];

const data_test: Category[] = [
    {
        id: 1,
        code_category: "C001",
        nom_de_categorie: "Category 1",
    },
    {
        id: 2,
        code_category: "C002",
        nom_de_categorie: "Category 2",
    }
];