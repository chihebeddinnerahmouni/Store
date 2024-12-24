import Date from "../../../components/ventes/add vente/1stCont/Date";
import Fournisseur from "../../../components/ventes/add vente/1stCont/Fournisseur";
import Magasain from "../../../components/ventes/add vente/1stCont/Magasain";

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
}

const VenteStCont = ({
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
    </section>
  );
};

export default VenteStCont;
