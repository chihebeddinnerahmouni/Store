import InputText from "../../../ui/inputs/InputText";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const Remark = () => {
  const { remark, setRemark } = useContext(VentsContext);

  // console.log(magasinArray);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedUser"} text={"Remarque"} />
      <InputText
        value={remark}
        setValue={setRemark}
        label="Entrer la Remarque"
      />
    </div>
  );
};


export default Remark;
