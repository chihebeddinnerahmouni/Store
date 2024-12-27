import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";

interface Props {
  usersArray: any[];
  userName: string;
  setUserName: (value: string) => void;
}

const Users = ({ userName, setUserName, usersArray}: Props) => {
  // console.log(usersArray);

  const newOptions = usersArray.map((option: any) => ({
    id: option.id,
    name: option.name + " " + option.surname,
  }));
    
  // console.log(newOptions);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Ajouter par"} />
      <SelectInput
        options={newOptions}
        label="L'utilisateur"
        value={userName}
        setValue={(value: string) => {
            setUserName(value);
        }}
      />
    </div>
  );
};


export default Users;

