import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";

interface Props {
  fournisseurArray: any[];
  setFournisseurName: (value: string) => void;
  fournisseurName: string;
}

const Fourni = ({ fournisseurName, setFournisseurName, fournisseurArray }: Props) => {
  // console.log(clientsArray);

  const newOptions = fournisseurArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  // console.log(newOptions);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsclient"} text={"Fournisseur"} />
      <SelectInput
        options={newOptions}
        label="Par fournisseur"
        value={fournisseurName}
        setValue={(value: string) => {
          setFournisseurName(value);
        }}
      />
    </div>
  );
};


export default Fourni;
