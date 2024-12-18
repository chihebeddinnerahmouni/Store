import Designation from '../../../components/products/add products/1st section/Designation';
import CodeBarre from '../../../components/products/add products/1st section/CodeBarre';
import Category from '../../../components/products/add products/1st section/Category';
import Marque from '../../../components/products/add products/1st section/Marque';
import Tax from '../../../components/products/add products/1st section/Tax';
import Description from '../../../components/products/add products/1st section/Description';

interface ProductStContProps {
  clearErrors: any
  register: any;
  errors: any;
  designation: string;
  setDesignation: (value: string) => void;
  codeBarre: string;
  setCodeBarre: (value: string) => void;
  category: string;
    setCategory: (value: string) => void;
    marque: string;
  setMarque: (value: string) => void;
  tax: string;
  setTax: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const ProductStCont = ({
  clearErrors,
  register,
  errors,
  designation,
  setDesignation,
  codeBarre,
  setCodeBarre,
  category,
    setCategory,
    marque,
  setMarque,
  tax,
  setTax,
  description,
  setDescription,
}: ProductStContProps) => {

  return (
    <section className="cardCss grid grid-cols-1 gap-5">
          <Designation
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"designation"}
        setDesignation={setDesignation}
        designation={designation}
      />

      <CodeBarre
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"codeBarre"}
        value={codeBarre}
        setValue={setCodeBarre}
      />
          <Category
              clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"category"}
        value={category}
        setValue={setCategory}
          />
          
          <Marque
              clearErrors={clearErrors}
              register={register}
              errors={errors}
              id={"marque"}
              value={marque}
              setValue={setMarque}
      />
      
      <Tax
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"tax"}
        value={tax}
        setValue={setTax}
      />

      <Description
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"description"}
        value={description}
        setValue={setDescription}
      />
    </section>
  );
};

export default ProductStCont;