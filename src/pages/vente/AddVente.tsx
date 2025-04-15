import PageTitle from "../../components/ui/PageTitle";
import VenteStCont from "../../containers/vente/add vente/VenteStCont";
import { useState, useEffect, useContext } from "react";
import TableCont from "../../containers/vente/add vente/TableCont";
// import VenteNdCont from "../../containers/vente/add vente/VenteNdCont";
import TotalCont from "../../containers/vente/add vente/TotalCont";
import axios from "axios";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IMagasin from "../../types/magasin";
import IClient from "../../types/client";
import { useSuspenseQueries, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAdd_vente_form } from "../../types/ventes/add_vente_form";
import { IProductCommandeItem } from "../../types/products/product_to_commande";
import { handleAxiosError } from "../../helper/axios_error";
import { enqueueSnackbar } from "notistack";


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
        queryFn: () => fetchHelper("api/entreports"),
      },
      {
        queryKey: ["providers"],
        queryFn: () => fetchHelper("api/clients"),
      },
    ],
  });
  const magasins: { entrepots: IMagasin[] } = (queries[0]?.data ?? {
    entrepots: [],
  }) as {
    entrepots: IMagasin[];
  };
  const clients: { clients: IClient[] } = (queries[1]?.data ?? {
    clients: [],
  }) as {
    clients: IClient[];
  };

  return { magasins: magasins.entrepots, clients: clients.clients };
};

const sendData = async (body: any) => {
  const { data } = await axios.post(`${url}/api/vente/add-vente`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};



const AddAchat = () => {
  const { magasins, clients } = fetchData();

  const [productsCommandeArray, setProductsCommandeArray] = useState<
    IProductCommandeItem[]
  >([]);
  const taxe = "0";
  const remise = "0";
  const laivraison = "0";
  const status = "";
  const remarque = "";

  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Sorties || !privileges.Sorties["Ajouter une sortie"]) navigate("/tableau-de-bord");
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, { variant: "success" });
      formik.resetForm();
      setProductsCommandeArray([]);
    },
    onError: handleAxiosError
  })

  const send = () => {
    const products = productsCommandeArray.map((product) => ({
      product_id: product.id,
      quantity_sold: product.quantite,
      unit_price: product.cout_unitaire,
      remise: parseFloat(remise),
      tax: parseFloat(taxe),
      ...(product.has_serial_number && {
        serial_numbers: product.serial_numbers,
      }),
    }));

    const body = {
      client_id: formik.values.clientId,
      entrepot_id: formik.values.magasainId,
      date: formik.values.date,
      user_invoice_number: formik.values.user_invoice_number,
      livraison_cost: parseFloat(laivraison),
      tax: parseFloat(taxe),
      remise: parseFloat(remise),
      status: status,
      remarks: remarque,
      products: products,
    }
    mutate(body);
  };

const formik = useFormik<IAdd_vente_form>({
  initialValues: {
    date: "",
    clientId: 0,
    magasainId: 0,
    user_invoice_number: "",
  },
  validationSchema: Yup.object({
    date: Yup.string().required("Champ requis"),
    clientId: Yup.number().notOneOf([0], "Champ requis"),
    magasainId: Yup.number().notOneOf([0], "Champ requis"),
    user_invoice_number: Yup.string().required("Champ requis"),
  }),
  onSubmit: () => send(),
});
  
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Ajouter Sortie" />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <VenteStCont
            clientsArray={clients || []}
            magasainsArray={magasins || []}
            formik={formik}
          />
          <TableCont
            productsCommandeArray={productsCommandeArray}
            setProductsCommandeArray={setProductsCommandeArray}
          />

          {/* <VenteNdCont
            taxe={taxe}
            // setTaxe={setTaxe}
            remise={remise}
            // setRemise={setRemise}
            laivraison={laivraison}
            // setLaivraison={setLaivraison}
            status={status}
            // setStatus={setStatus}
            remarque={remarque}
            // setRemarque={setRemarque}
          /> */}
          <TotalCont
            remise={remise}
            taxe={taxe}
            laivraison={laivraison}
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
