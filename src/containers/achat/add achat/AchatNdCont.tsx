import Taxe from "../../../components/achat/add achat/2ndCont/Taxe";
import Remise from "../../../components/achat/add achat/2ndCont/Remise";
import Laivraison from "../../../components/achat/add achat/2ndCont/Laivraison";
import Status from "../../../components/achat/add achat/2ndCont/Status";
import Remarque from "../../../components/achat/add achat/2ndCont/Remarque";

interface ProductStContProps {
  clearErrors: any;
  register: any;
    errors: any;
    taxe: string;
    setTaxe: (value: string) => void;
    remise: string;
    setRemise: (value: string) => void;
    laivraison: string;
    setLaivraison: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    remarque: string;
    setRemarque: (value: string) => void;
}

const AchatNdCont = ({
  clearErrors,
  register,
    errors,
    taxe,
    setTaxe,
    remise,
    setRemise,
    laivraison,
    setLaivraison,
    status,
    setStatus,
    remarque,
    setRemarque,
}: ProductStContProps) => {
  return (
      <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          

        <Taxe
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            id={"taxe"}
            setValue={setTaxe}
              value={taxe}
          />
          
            <Remise
                clearErrors={clearErrors}
                register={register}
                errors={errors}
                id={"remise"}
                setValue={setRemise}
              value={remise}
            />

            <Laivraison
                clearErrors={clearErrors}
                register={register}
                errors={errors}
                id={"laivraison"}
                setValue={setLaivraison}
              value={laivraison}
          />

            <Status
                clearErrors={clearErrors}
                register={register}
                errors={errors}
                id={"status"}
                setValue={setStatus}
              value={status}    
          />
          
            <Remarque
                clearErrors={clearErrors}
                register={register}
                errors={errors}
                id={"remarque"}
                setValue={setRemarque}
              value={remarque}
            />          
     </section>
  );
};


export default AchatNdCont;
