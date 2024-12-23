import InputNumber from "../../../ui/inputs/InputNumber";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { AchatsContext } from "../../../../pages/achat/Achats";

const MaxLaivraison = () => {
  const { maxLaivraison, setMaxLaivraison } = useContext(AchatsContext);

  // console.log(magasinArray);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedUser"} text={"Prix max de l'ivraison"} />
      <InputNumber
        value={maxLaivraison}
        setValue={setMaxLaivraison}
        label="Entrer le prix mmax"
      />
    </div>
  );
};

export default MaxLaivraison;
