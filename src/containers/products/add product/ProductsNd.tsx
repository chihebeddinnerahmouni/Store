// import Type from "../../../components/products/add products/2nd section/Type";
import PrixAchat from "../../../components/products/add products/2nd section/PrixAchat";
import PrixVente from "../../../components/products/add products/2nd section/PrixVente";
import Unite from "../../../components/products/add products/2nd section/Unite";
// import UniteVente from "../../../components/products/add products/2nd section/UniteVente";
// import UniteAchat from "../../../components/products/add products/2nd section/UniteAchat";
import StockAlert from "../../../components/products/add products/2nd section/StockAlert";
import NumSerie from "../../../components/products/add products/2nd section/NumSerie";
// import Quantite from "../../../components/products/add products/2nd section/Quantite";
import IUnite from "../../../types/unite";
import { FormikProps } from "formik";
import { ProductFormValues } from "../../../types/products/form";



interface ProductStContProps {
  formik: FormikProps<ProductFormValues>;
  unitesArray: IUnite[];
}

const ProductsNd = ({
  formik,
  unitesArray,
}: ProductStContProps) => {
  return (
    <section className="flex flex-col gap-5 lg:gap-8 lg:col-span-4">
      <div className="top cardCss grid grid-cols-1 gap-5 lg:gap-8">
        <PrixAchat id={"prixAchat"} formik={formik} />
        <PrixVente id={"prixVente"} formik={formik} />
        <Unite options={unitesArray} id={"unite"} formik={formik} />
        <StockAlert id={"stockAlert"} formik={formik} />
      </div>

      <NumSerie formik={formik} />
    </section>
  );
};

export default ProductsNd;
