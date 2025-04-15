import InputText from "../../../ui/inputs/InputText";
import Label from "../../../ui/Label";

interface IProps {
  value: string;
  setValue: (value: string) => void;
}

const UserInvNumber = ({value, setValue}: IProps) => {

  // console/vente/Vents);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedUser"} text={"Reference de l'utulisateur"} />
      <InputText
        value={value}
        setValue={setValue}
        label="Entrer la reference de l'utulisateur"
      />
    </div>
  );
};

export default UserInvNumber;
