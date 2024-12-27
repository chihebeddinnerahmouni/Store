// import SelectInput from "../../../../ui/inputs/SelectInput";
// import Label from "../../../../ui/Label";

// interface Props {
//   magasinName: string;
//   setMagasinName: (value: string) => void;
//   magasinsArray: any[];
// }

// const Magasin = ({
//   magasinName,
//   setMagasinName,
//   magasinsArray,
// }: Props) => {


// // console.log(magasinsArray);

//   const newOptions = magasinsArray.map((option: any) => ({
//     id: option.id,
//     name: option.name,
//   }));

//   // console.log(magasinName);

//   // console.log(newOptions);

//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={"filterProductsFourni"} text={"Magasins"} />
//       <SelectInput
//         options={newOptions}
//         label="Par magasin"
//         value={magasinName}
//         setValue={(value: string) => {
//           setMagasinName(value);
//         }}
//       />
//     </div>
//   );
// };


// export default Magasin;
import SelectInput from "../../../../../components/ui/inputs/SelectInput";

interface DesignationProps {
  options: any[];
  setValue: (value: number) => void;
  value: number;
}

const MagasinSelect = ({ value, setValue, options }: DesignationProps) => {
  // console.log(options);

  const newOptions = options.map((option) => ({
    id: option.id,
    name: option.name,
  }));

  console.log(newOptions);

  return (
    <section className="bg-red200 w-full flex flex-col gap-3 max-w-[400px]">
      <SelectInput
        options={newOptions}
        label="Selectionnez le magasin*"
        value={
          value === 0
            ? ""
            : newOptions.find((option) => option.id === value)?.name
        }
        setValue={(value: string) => {
          const selectedOption = newOptions.find(
            (option) => option.name === value
          );
          const valueId = selectedOption ? selectedOption.id : 0;
          setValue(valueId);
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
