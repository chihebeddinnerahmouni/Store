import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";

interface IProps {
  magasinId: number;
  setMagasinId: (magasinId: number) => void;
  magasinsArray: any[];
}

const Magasin = ({ magasinsArray, magasinId, setMagasinId }: IProps) => {
  // console.log(magasinArray);

  const newOptions = magasinsArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Magasins"} />
      <SelectInput
        options={newOptions}
        label="Par magasin"
        value={magasinId}
        setValue={(value: string) => {
          setMagasinId(newOptions.find((option: any) => option.name === value)?.id)
        }}
      />
    </div>
  );
};


export default Magasin;
