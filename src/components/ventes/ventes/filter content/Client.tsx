import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const Client = () => {
  const { clientId, setClientId, clientsArray } = useContext(VentsContext);

//   console.log(clientsArray);

  const newOptions = clientsArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Client"} />
      <SelectInput
        options={newOptions}
        label="Par client"
        value={
          clientId === 0
            ? ""
            : newOptions.find((option: any) => option.id === clientId)?.name
        }
        setValue={(value: string) => {
          const selectedOption = newOptions.find(
            (option: any) => option.name === value
          );
          const valueId = selectedOption ? selectedOption.id : 0;
          setClientId(valueId);
        }}
      />
    </div>
  );
};


export default Client;
