import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";

interface IProps {
  clientId: number;
  setClientId: (clientId: number) => void;
  clientsArray: any[];
}

const Client = ({ clientId, setClientId, clientsArray }: IProps) => {

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
        value={clientId}
        setValue={(value: string) => {
          setClientId(
            newOptions.find((option: any) => option.name === value)?.id
          );
        }}
      />
    </div>
  );
};

export default Client;
