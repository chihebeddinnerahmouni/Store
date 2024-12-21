import Designation from '../../../components/products/add products/1st section/Designation';
import CodeBarre from '../../../components/products/add products/1st section/CodeBarre';
import Category from '../../../components/products/add products/1st section/Category';
import Marque from '../../../components/products/add products/1st section/Marque';
import Tax from '../../../components/products/add products/1st section/Tax';
import Description from '../../../components/products/add products/1st section/Description';
import Reyonage from '../../../components/products/add products/1st section/Reyonage';



interface ProductStContProps {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  designation: string;
  setDesignation: (value: string) => void;
  codeBarre: string;
  setCodeBarre: (value: string) => void;
  category: number;
  setCategory: (value: number) => void;
  marque: number;
  setMarque: (value: number) => void;
  tax: string;
  setTax: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  reyonage: number;
  setReyonage: (value: number) => void;
}

const ProductStCont = ({
  control,
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
  reyonage,
  setReyonage,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8 lg:col-span-9">
      <Designation
        control={control}
        clearErrors={clearErrors}
        errors={errors}
        id={"designation"}
        setDesignation={setDesignation}
        designation={designation}
      />

      <CodeBarre
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"codeBarre"}
        value={codeBarre}
        setValue={setCodeBarre}
      />
      <Category
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"category"}
        value={category}
        setValue={setCategory}
      />

      <Marque
        control={control} 
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"marque"}
        value={marque}
        setValue={setMarque}
      />

      <Reyonage
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"reyonage"}
        value={reyonage}
        setValue={setReyonage}
      />

      <Tax
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"tax"}
        value={tax}
        setValue={setTax}
      />

      <Description
        control={control}
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