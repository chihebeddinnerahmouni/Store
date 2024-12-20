import Taxe from "../../../components/achat/add achat/2ndCont/Taxe";
import Remise from "../../../components/achat/add achat/2ndCont/Remise";
import Laivraison from "../../../components/achat/add achat/2ndCont/Laivraison";
import Status from "../../../components/achat/add achat/2ndCont/Status";
import Remarque from "../../../components/achat/add achat/2ndCont/Remarque";

interface ProductStContProps {
    taxe: string;
    setTaxe: (value: string) => void;
    // remise: string;
    // setRemise: (value: string) => void;
    // laivraison: string;
    // setLaivraison: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    remarque: string;
    setRemarque: (value: string) => void;
}

const AchatNdCont = ({
    taxe,
    setTaxe,
    // remise,
    // setRemise,
    // laivraison,
    // setLaivraison,
    status,
    setStatus,
    remarque,
    setRemarque,
}: ProductStContProps) => {
  return (
      <section className="cardCss grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          

        <Taxe
            id={"taxe"}
            setValue={setTaxe}
              value={taxe}
          />
          
            {/* <Remise
                id={"remise"}
                setValue={setRemise}
              value={remise}
            />

            <Laivraison
                id={"laivraison"}
                setValue={setLaivraison}
              value={laivraison}
          /> */}

            <Status
                id={"status"}
                setValue={setStatus}
              value={status}    
          />
          
            <Remarque
                id={"remarque"}
                setValue={setRemarque}
              value={remarque}
            />          
     </section>
  );
};


export default AchatNdCont;
