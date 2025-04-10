import Date from "../../../components/achat/add achat/1stCont/Date";
import Fournisseur from "../../../components/achat/add achat/1stCont/Fournisseur";
import Magasain from "../../../components/achat/add achat/1stCont/Magasain";
import UserInvNumber from "../../../components/achat/add achat/1stCont/UserInvNumber";
import { IProvider } from "../../../types/provider";
import IMagasin from "../../../types/magasin";
import { IAdd_achat_form } from "../../../types/achats/add achat/add_achat_form";
import { FormikProps } from "formik";

interface ProductStContProps {
  providersArray: IProvider[];
  magasainsArray: IMagasin[];
  formik: FormikProps<IAdd_achat_form>;
}

const AchatStCont = ({
  providersArray,
  magasainsArray,
  formik,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <Date formik={formik} id={"date"} />
      <Fournisseur options={providersArray} id={"client"} formik={formik} />
      <Magasain options={magasainsArray} formik={formik} id={"magasin"} />
      <UserInvNumber id={"user_invoice_number"} formik={formik} />
    </section>
  );
};

export default AchatStCont;
