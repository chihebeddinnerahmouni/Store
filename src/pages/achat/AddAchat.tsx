import PageTitle from "../../components/ui/PageTitle";
import AchatStCont from "../../containers/achat/add achat/AchatStCont";
import { useState, useEffect, useContext } from "react";
import TableCont from "../../containers/achat/add achat/TableCont";
// import AchatNdCont from "../../containers/achat/add achat/AchatNdCont";
import TotalCont from "../../containers/achat/add achat/TotalCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQueries, useMutation } from "@tanstack/react-query";
import IMagasin from "../../types/magasin";
import { IProvider } from "../../types/provider";
import { useFormik } from "formik";
import * as Yup from "yup";
import {IAdd_achat_form} from "../../types/achats/add achat/add_achat_form";
import {IProductCommandeItem} from "../../types/products/product_to_commande";
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

const fetchData = () => {
  const queries = useSuspenseQueries({
    queries: [
      {
        queryKey: ["authorised_magasins"],
        queryFn: () => fetchHelper("api/entreports/authorized/get"),
      },
      {
        queryKey: ["providers"],
        queryFn: () => fetchHelper("api/providers"),
      },
    ],
  });
  // console.log(queries[0]?.data.entrepots);
  const magasins: { entrepots: IMagasin[] } = (queries[0]?.data ?? {
    entrepots: [],
  }) as {
    entrepots: IMagasin[];
  };
  const providers: { providers: IProvider[] } = (queries[1]?.data ?? {
    providers: [],
  }) as {
    providers: IProvider[];
    };

  return { magasins: magasins.entrepots, providers: providers.providers };
};

const sendData = async (body: any) => { 
  const { data } = await axios.post(`${url}/api/achats`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
}




const AddAchat = () => {
  // const [produit, setProduit] = useState<string>("");
  const [productsCommandeArray, setProductsCommandeArray] = useState<
    IProductCommandeItem[]
  >([]);

  const navigate = useNavigate();
  const privileges = useContext(PrivilegesContext);

  useEffect(() => {
    if (!privileges.entrées["Ajouter un entrée"]) navigate("/tableau-de-bord");
  }, []);

  const { providers, magasins } = fetchData();
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, { variant: "success" });
      formik.resetForm();
    },
    onError: handleAxiosError,
  });

  const send = () => {
    const products_to_send = productsCommandeArray.map((product) => ({
      product_id: product.id,
      quantity_declared: product.quantite,
      remise: 0,
      livraison_cost: 0,
      tax: product.taxe,
      ...(product.has_serial_number && {
        serial_numbers: product.serial_numbers,
      }),
    }));
    const body = {
      provider_id: formik.values.provider,
      entrepot_id: formik.values.magasain,
      user_invoice_number: formik.values.user_invoice_number,
      date: formik.values.date,
      products: products_to_send,
    };
    mutate(body);
  };

const formik = useFormik<IAdd_achat_form>({
  initialValues: {
    date: "",
    provider: 0,
    magasain: 0,
    user_invoice_number: "",
  },
  validationSchema: Yup.object({
    date: Yup.string().required("Champ requis"),
    provider: Yup.number().notOneOf([0], "Champ requis"),
    magasain: Yup.number().notOneOf([0], "Champ requis"),
    user_invoice_number: Yup.string().required("Champ requis"),
  }),
  onSubmit: () => send()
});



  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter Entrée" />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <AchatStCont
            providersArray={providers}
            magasainsArray={magasins}
            formik={formik}
          />
          <TableCont
            // produit={produit}
            // setProduit={setProduit}
            productsCommandeArray={productsCommandeArray}
            setProductsCommandeArray={setProductsCommandeArray}
          />

          <TotalCont
            productsCommandeArray={productsCommandeArray}
          />
        </div>
        <div className="button mt-5">
          <FullShiningButton
            type="submit"
            loading={isPending}
            text="Soumettre"
          />
        </div>
      </form>
    </div>
  );
};

export default AddAchat;
