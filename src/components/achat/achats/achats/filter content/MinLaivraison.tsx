import InputNumber from "../../../../ui/inputs/InputNumber";
import Label from "../../../../ui/Label";
import { useContext } from "react";
import { AchatsContext } from "../../../../../pages/achat/Achats";

const MinLaivraison = () => {
  const { minLaivraison, setMinLaivraison } = useContext(AchatsContext);

  // console.log(magasinArray);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedUser"} text={"Prix min de l'ivraison"} />
      <InputNumber
        value={minLaivraison}
        setValue={setMinLaivraison}
        label="Entrer le prix min"
      />
    </div>
  );
};


export default MinLaivraison;
