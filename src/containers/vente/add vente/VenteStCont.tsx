import Date from "../../../components/ventes/add vente/1stCont/Date";
import Magasain from "../../../components/ventes/add vente/1stCont/Magasain";
import Client from "../../../components/ventes/add vente/1stCont/Clients";
import UserInvNumber from "../../../components/ventes/add vente/1stCont/UserInvNumber";
import IMagasin from "../../../types/magasin";
import IClient from "../../../types/client";
import { FormikProps } from "formik";
import { IAdd_vente_form } from "../../../types/ventes/add_vente_form";


interface ProductStContProps {
  magasainsArray: IMagasin[];
  clientsArray: IClient[];
  formik: FormikProps<IAdd_vente_form>;
}

const VenteStCont = ({
  magasainsArray,
  clientsArray,
  formik,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <Date
        id={"date"}
        formik={formik}
      />

      <UserInvNumber
        formik={formik}
        id={"user_invoice_number"}
      />    

     <Client
        clientsArray={clientsArray}
        id={"client"}
        formik={formik}
      />

       <Magasain
        options={magasainsArray}
        id={"magasain"}
        formik={formik}
      />
    </section>
  );
};

export default VenteStCont;
