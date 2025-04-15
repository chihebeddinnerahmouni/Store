import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";

interface Props {
  fournisseurArray: any[];
  setFournisseurName: (value: string) => void;
  fournisseurName: string;
}

const Fourni = ({ fournisseurName, setFournisseurName, fournisseurArray }: Props) => {

  const newOptions = fournisseurArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));


  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsclient"} text={"Fournisseur"} />
      <SelectInput
        options={newOptions}
        label="Par fournisseur"
        value={Number(fournisseurName)}
        setValue={(value: string) => {
          setFournisseurName(newOptions.find((option) => option.name === value)?.id || 0);
        }}
      />
    </div>
  );
};


export default Fourni;
