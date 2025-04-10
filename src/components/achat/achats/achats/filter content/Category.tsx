import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";


interface IProps {
  options: any[];
  value: number;
  setValue: (value: number) => void;
}

const Category = ({ options, value, setValue }: IProps) => {
  const newOptions = options.map((option: any) => ({
    id: option.id,
    name: option.name_category,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Categorie"} />
      <SelectInput
        options={newOptions}
        label="Selectionner une categorie"
        value={value}
        setValue={(value: string) => {
          setValue(newOptions.find((option: any) => option.name === value)?.id);
        }}
      />
    </div>
  );
};


export default Category;
