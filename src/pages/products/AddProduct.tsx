import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  designation: string;
  codeBarre: string;
  category: string;
  marque: string;
  tax: string;
};

const AddProduct = () => {
  const [designation, setDesignation] = useState<string>("");
  const [codeBarre, setCodeBarre] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [marque, setMarque] = useState<string>("");
  const [tax, setTax] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter un produit" />
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
          <ProductStCont
            clearErrors={clearErrors}
          register={register}
          errors={errors}
          designation={designation}
          setDesignation={setDesignation}
          codeBarre={codeBarre}
          setCodeBarre={setCodeBarre}
          category={category}
            setCategory={setCategory}
            marque={marque}
            setMarque={setMarque}
            tax={tax}
            setTax={setTax}
        />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;


// import PageTitle from "../../components/ui/PageTitle";
// import ProductStCont from "../../containers/products/add product/ProductStCont";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// // Define validation schema using Yup
// const validationSchema = Yup.object().shape({
//   designation: Yup.string().required("Designation is required"),
//   codeBarre: Yup.string().required("Code Barre is required"),
//   category: Yup.string().required("Category is required"),
// });

// interface IFormInputs {
//   designation: string;
//   codeBarre: string;
//   category: string;
// }

// const AddProduct = () => {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInputs>({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
//     console.log("Form data", data);
//   };

//   return (
//     <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
//       <PageTitle text="Ajouter un produit" />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <ProductStCont register={register} errors={errors} />
//         <div className="form-group">
//           <label htmlFor="designation">Designation</label>
//           <input
//             type="text"
//             id="designation"
//             {...register("designation")}
//             className={`form-control ${errors.designation ? "is-invalid" : ""}`}
//           />
//           <div className="invalid-feedback">{errors.designation?.message}</div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="codeBarre">Code Barre</label>
//           <input
//             type="text"
//             id="codeBarre"
//             {...register("codeBarre")}
//             className={`form-control ${errors.codeBarre ? "is-invalid" : ""}`}
//           />
//           <div className="invalid-feedback">{errors.codeBarre?.message}</div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             {...register("category")}
//             className={`form-control ${errors.category ? "is-invalid" : ""}`}
//           />
//           <div className="invalid-feedback">{errors.category?.message}</div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
// import PageTitle from "../../components/ui/PageTitle";
// import ProductStCont from "../../containers/products/add product/ProductStCont";
// import { useState } from "react";


// const AddProduct = () => {

//   const [designation, setDesignation] = useState<string>("");
//   const [codeBarre, setCodeBarre] = useState<string>("");
//   const [category, setCategory] = useState<string>("");

//   return (
//     <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
//       <PageTitle text="Ajouter un produit" />
//       <div className="">
//         <ProductStCont
//           designation={designation}
//           setDesignation={setDesignation}
//           codeBarre={codeBarre}
//           setCodeBarre={setCodeBarre}
//           category={category}
//           setCategory={setCategory}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddProduct;





