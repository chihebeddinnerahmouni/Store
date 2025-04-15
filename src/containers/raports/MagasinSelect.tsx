import SelectInput from "../../components/ui/inputs/SelectInput";

interface DesignationProps {
  options: any[];
  setValue: (value: number) => void;
  value: number;
}

const MagasinSelect = ({ value, setValue, options }: DesignationProps) => {

  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <section className="bg-red200 w-full flex flex-col gap-3 max-w-[400px]">
      <SelectInput
        options={newOptions}
        label="Selectionnez le magasin*"
        value={value}
        setValue={(value: string) => {
          setValue(newOptions.find((option) => option.name === value)?.id || 0);
        }}
      />
    </section>
  );
};

export default MagasinSelect;

// const options_array = [
//   { id: 1, name: "magasin 1" },
//   { id: 2, name: "magasin 2" },
//   { id: 3, name: "magasin 3" },
//   { id: 4, name: "magasin 4" },
// ];
