import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";

interface Props {
  clientsArray: any[];
  setClientName: (value: string) => void;
  clientName: string;
}

const Clients = ({ clientName, setClientName, clientsArray }: Props) => {
  // console.log(clientsArray);

  const newOptions = clientsArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  // console.log(newOptions);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsclient"} text={"Client"} />
      <SelectInput
        options={newOptions}
        label="Par Client"
        value={Number(clientName)}
        setValue={(value: string) => {
          setClientName(newOptions.find((option) => option.name === value)?.id || 0);
        }}
      />
    </div>
  );
};


export default Clients;
