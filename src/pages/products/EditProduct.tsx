import PageTitle from "../../components/ui/PageTitle";
import ProductStCont from "../../containers/products/add product/ProductStCont";
import ProductsNd from "../../containers/products/add product/ProductsNd";
import InstructionsCont from "../../containers/products/add product/InstructionsCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import IProductSingle from "../../types/IProductSingle";
import { useParams } from "react-router-dom";
import { ProductFormValues } from "../../types/products/form";
import ICategory from "../../types/category";
import IMArque from "../../types/marque";
import IReyonnage from "../../types/reyonnage";
import IUnite from "../../types/unite";
import { useSuspenseQueries, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleAxiosError } from "../../helper/axios_error";

const url = import.meta.env.VITE_BASE_URL;

const fetchHelper = async (endPointe: string) => {
  const response = await axios.get(`${url}/${endPointe}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const fetchData = (id: string) => {
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
      {
        queryKey: ["product", id],
        queryFn: () => fetchHelper("api/products/" + id),
      },
    ],
  });
  const categories: { categories: ICategory[] } = (queries[0]?.data ?? {
    categories: [],
  }) as {
    categories: ICategory[];
  };
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
  const product: { product: IProductSingle } = (queries[4]?.data ?? {
    product: {},
  }) as {
    product: IProductSingle;
  };

  return {
    categories: categories.categories,
    brands: brands.brands,
    units: units.units,
    rayonages: rayonages.rayonages,
    product: product.product,
  };
};

const sendData = async (values: ProductFormValues, id: string) => {
  const response = await axios.put(
    `${url}/api/products/${id}`,
    {
      name: values.designation,
      code_barre: values.codeBarre,
      category_id: values.category,
      brand_id: values.marque,
      unit_id: values.unite,
      reyonage_id: values.reyonage,
      has_serial_number: values.numSerie ? 1 : 0,
      tax_percentage: Number(values.tax),
      description: values.description,
      price_buy: Number(values.prixAchat),
      price_sell: Number(values.prixVente),
      stock_alert: Number(values.stockAlert),
      quantity: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

const EditProduct = () => {
  const { produitId } = useParams<{ produitId: string }>();

  const { categories, brands, units, rayonages, product } = fetchData(
    produitId!
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => sendData(values, produitId!),
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, { variant: "success" });
    },
    onError: handleAxiosError,
  });

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      designation: product.name,
      codeBarre: product.code_barre,
      category: product.category_id,
      marque: product.brand_id,
      tax: product.tax_percentage,
      description: product.description,
      prixAchat: product.price_buy,
      prixVente: product.price_sell,
      unite: product.unit_id,
      stockAlert: product.stock_alert.toString(),
      reyonage: product.rayonage.id,
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
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Modifier produit" />
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          <ProductStCont
            formik={formik}
            categoriesArray={categories}
            marquesArray={brands}
            reyonagesArray={rayonages}
          />

          <ProductsNd formik={formik} unitesArray={units} />
          <div className="lg:col-span-3 lg:hidden">
            <InstructionsCont />
          </div>
        </div>
        <div className="button mt-5">
          <FullShiningButton
            text="Soumettre"
            loading={isPending}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
