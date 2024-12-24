import InputText from "../../../ui/inputs/InputText";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const InvNumber = () => {
  const { reference, setReference } = useContext(VentsContext);

  // console.log(magasinArray);

  return (
    <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterAchatedDate"} text={"Reference"} />
            <InputText
                value={reference}
                setValue={setReference}
              label="Entrer la reference"
            />
    </div>
  );
};


export default InvNumber;
