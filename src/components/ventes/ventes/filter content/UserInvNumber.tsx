import InputText from "../../../ui/inputs/InputText";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const UserInvNumber = () => {
  const { userInvNumber, setUserInvNumber } = useContext(VentsContext);

  // console/vente/Vents);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedUser"} text={"Reference de l'utulisateur"} />
      <InputText
        value={userInvNumber}
        setValue={setUserInvNumber}
        label="Entrer la reference de l'utulisateur"
      />
    </div>
  );
};

export default UserInvNumber;
