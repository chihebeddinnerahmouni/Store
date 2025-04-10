import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";

interface IProps {
  options: any[];
  value: number;
  setValue: (value: number) => void;
}

const Magasin = ({ options, value, setValue }: IProps) => {
  const newOptions = options.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsMagasins"} text={"Magasins"} />
      <SelectInput
        options={newOptions}
        label="Par Magasins"
        value={value}
        setValue={(value: string) => {
          setValue(newOptions.find((option: any) => option.name === value)?.id);
        }}
      />
    </div>
  );
};

export default Magasin;
