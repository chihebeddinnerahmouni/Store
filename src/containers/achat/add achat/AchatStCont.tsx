import Date from "../../../components/achat/add achat/1stCont/Date";
import Fournisseur from "../../../components/achat/add achat/1stCont/Fournisseur";
import Magasain from "../../../components/achat/add achat/1stCont/Magasain";
import UserInvNumber from "../../../components/achat/add achat/1stCont/UserInvNumber";



interface ProductStContProps {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  date: string;
  setDate: (value: string) => void;
  // client: string;
  // setClient: (value: string) => void;
  fournisseur: number;
  setFournisseur: (value: number) => void;
  magasain: number;
  setMagasain: (value: number) => void;
  fournisseuresArray: any[];
  magasainsArray: any[];
  user_invoice_number: string;
  setUserInvoiceNumber: (value: string) => void;
}

const AchatStCont = ({
  control,
  clearErrors,
  register,
  errors,
  date,
  setDate,
  // client,
  // setClient,
  fournisseur,
  setFournisseur,
  magasain,
  setMagasain,
  fournisseuresArray,
  magasainsArray,
  user_invoice_number,
  setUserInvoiceNumber,
}: ProductStContProps) => {
  return (
    <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      <Date
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        value={date}
        setValue={setDate}
        id={"date"}
      />

      <Fournisseur
        options={fournisseuresArray}
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"client"}
        value={fournisseur}
        setValue={setFournisseur}
      />

      <Magasain
        options={magasainsArray}
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"magasain"}
        value={magasain}
        setValue={setMagasain}
      />

      <UserInvNumber
        options={fournisseuresArray}
        control={control}
        clearErrors={clearErrors}
        register={register}
        errors={errors}
        id={"user_invoice_number"}
        value={user_invoice_number}
        setValue={setUserInvoiceNumber}
      />
    </section>
  );
};

export default AchatStCont;
