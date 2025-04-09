import Designation from '../../../components/products/add products/1st section/Designation';
import CodeBarre from '../../../components/products/add products/1st section/CodeBarre';
import Category from '../../../components/products/add products/1st section/Category';
import Marque from '../../../components/products/add products/1st section/Marque';
import Tax from '../../../components/products/add products/1st section/Tax';
import Description from '../../../components/products/add products/1st section/Description';
import Reyonage from '../../../components/products/add products/1st section/Reyonage';
import { FormikProps } from 'formik';
import { ProductFormValues } from "../../../types/achats/add achat/form";


interface ProductStContProps {
  formik: FormikProps<ProductFormValues>;
  categoriesArray: any;
  marquesArray: any;
  reyonagesArray: any;
}

const ProductStCont = ({
  formik,
  categoriesArray,
  marquesArray,
  reyonagesArray,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8 lg:col-span-8">
      <Designation
        formik={formik}
        id={"designation"}
      />

      <CodeBarre
        formik={formik}
      />
      <Category
        id={"category"}
        options={categoriesArray}
        formik={formik}
      />

      <Marque
        options={marquesArray}
        id={"marque"}
        formik={formik}
      />

     <Reyonage
        options={reyonagesArray}
        id={"reyonage"} 
        formik={formik}
      />

       <Tax
        id={"tax"}
        formik={formik}
      />

      <Description
        id={"description"}
        formik={formik}
      />
    </section>
  );
};

export default ProductStCont;