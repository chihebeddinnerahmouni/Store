import InputText from "../../../../ui/inputs/InputText";
import Label from "../../../../ui/Label";

interface Props {
    setUserInvNumber: (value: string) => void;
    userInvNumber: string;
}

const UserInvNum = ({ userInvNumber, setUserInvNumber }: Props) => {

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsInvNum"} text={"Référence de l'utilisateur"} />
      <InputText
        label="La référence"
        value={userInvNumber}
        setValue={(value: string) => {
          setUserInvNumber(value);
        }}
      />
    </div>
  );
};

export default UserInvNum;
