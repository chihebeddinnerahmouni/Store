import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import { useEffect, useContext } from "react";
import ProductsNd from "../../containers/products/add product/ProductsNd";
import InstructionsCont from "../../containers/products/add product/InstructionsCont";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSuspenseQueries, useMutation } from "@tanstack/react-query";
import { ProductFormValues } from "../../types/products/form";
import ICategory from "../../types/category";
import IMArque from "../../types/marque";
import IReyonnage from "../../types/reyonnage";
import IUnite from "../../types/unite";
import SubmitCont from "../../containers/products/add product/SubmitCont";
import { enqueueSnackbar } from "notistack";
import { handleAxiosError } from "../../helper/axios_error";

const url = import.meta.env.VITE_BASE_URL;

const fetchHelper = async (endPointe: string) => { 
  const response = await axios.get(`${url}/${endPointe}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

const fetchData = () => {
  const queries = useSuspenseQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => fetchHelper("api/categories"),
      },
      {
        queryKey: ["brands"],
        queryFn: () => fetchHelper("api/brands"),
      },
      {
        queryKey: ["units"],
        queryFn: () => fetchHelper("api/units"),
      },
      {
        queryKey: ["rayonages"],
        queryFn: () => fetchHelper("api/rayonages"),
      },
    ],
  });
  const categories: { categories: ICategory[] } = (queries[0]?.data ?? {
    categories: [],
  }) as {
    categories: ICategory[];
  };
  // const brands = queries[1]?.data;
  const brands: { brands: IMArque[] } = (queries[1]?.data ?? {
    brands: [],
  }) as {
    brands: IMArque[];
  };
  
  const units: { units: IUnite[] } = (queries[2]?.data ?? {
    units: [],
  }) as {
    units: IUnite[];
  };
  const rayonages: { rayonages: IReyonnage[] } = (queries[3]?.data ?? {
    rayonages: [],
  }) as {
    rayonages: IReyonnage[];
  };
  return { categories, brands, units, rayonages };
}


const sendData = async (values: ProductFormValues) => { 
  const response = await axios.post(
    `${url}/api/products`,
    {
      name: values.designation,
      code_barre: values.codeBarre,
      category_id: values.category,
      brand_id: values.marque,
      unit_id: values.unite,
      rayonage_id: values.reyonage,
      has_serial_number: values.numSerie,
      tax_percentage: Number(values.tax),
      description: values.description,
      price_buy: Number(values.prixAchat),
      price_sell: Number(values.prixVente),
      stock_alert: Number(values.stockAlert),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
}



const AddProduct = () => {
  

  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);
  const { categories, brands, units, rayonages } = fetchData();

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, { variant: "success" });
      navigate("/produits");
    },
    onError: handleAxiosError,
  });

  useEffect(() => { 
    if (!privileges.Produits["Ajouter un produit"]) navigate("/tableau-de-bord");
  }, []);



  const formik = useFormik<ProductFormValues>({
    initialValues: {
      designation: "",
      codeBarre: "",
      category: 0,
      marque: 0,
      tax: "",
      description: "",
      prixAchat: "",
      prixVente: "",
      unite: 0,
      stockAlert: "",
      reyonage: 0,
      numSerie: false,
    },
    validationSchema: Yup.object({
      designation: Yup.string().required("Champ requis"),
      codeBarre: Yup.string().required("Champ requis"),
      category: Yup.number().notOneOf([0], "Champ requis"),
      marque: Yup.number().notOneOf([0], "Champ requis"),
      reyonage: Yup.number().notOneOf([0], "Champ requis"),
      tax: Yup.string().required("Champ requis"),
      description: Yup.string().required("Champ requis"),
      prixAchat: Yup.string().required("Champ requis"),
      prixVente: Yup.string().required("Champ requis"),
      unite: Yup.number().notOneOf([0], "Champ requis"),
      stockAlert: Yup.string().required("Champ requis"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter un produit" />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <ProductStCont
            formik={formik}
            categoriesArray={categories.categories || []}
            marquesArray={brands.brands || []}
            reyonagesArray={rayonages.rayonages || []}
          />

          <ProductsNd formik={formik} unitesArray={units.units} />
          <div className="lg:col-span-12 lghidden">
            <InstructionsCont />
          </div>
        </div>
        <SubmitCont loading={isPending} />
      </form>
    </div>
  );
};

export default AddProduct;
