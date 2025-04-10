import SelectInput from "../../../../ui/inputs/SelectInput";
import Label from "../../../../ui/Label";

interface IProps {
  options: any[];
  value: number;
  setValue: (value: number) => void;
}

const Fourni = ({options, value, setValue}: IProps) => {
    
    const newOptions = options.map((option: any) => ({
      id: option.id,
      name: option.name,
    }));


    return (
      <div className="bg-red200 flex flex-col gap-3">
        <Label id={"filterProductsFourni"} text={"Fournisseures"} />
        <SelectInput
          options={newOptions}
          label="Par Fournisseure"
          value={value}
          setValue={(value: string) => {
            setValue(
              newOptions.find((option: any) => option.name === value)?.id
            );
          }}
        />
      </div>
    );
}

export default Fourni
