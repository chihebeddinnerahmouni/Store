import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";

interface Props {
  clientsArray: any[];
  setClientName: (value: number) => void;
  clientName: number;
}

const Clients = ({ clientName, setClientName, clientsArray }: Props) => {
  // console.log(clientsArray);

  const newOptions = clientsArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  // console.log(newOptions);
console.log(clientName);
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsclient"} text={"Client"} />
      <SelectInput
        options={newOptions}
        label="Par Client"
        value={clientName}
        setValue={(value: string) => {
          setClientName(newOptions.find((option) => option.name === value)?.id);
        }}
      />
    </div>
  );
};


export default Clients;
