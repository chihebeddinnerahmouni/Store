import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { AchatsContext } from "../../../../pages/achat/Achats";

const Magasin = () => {


  const { magasin, setMagasin, magasinArray } =
    useContext(AchatsContext);

// console.log(magasinArray);

  const newOptions = magasinArray.map((option: any) => ({
    id: option.id,
    name: option.name,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Magasins"} />
      <SelectInput
        options={newOptions}
        label="Par magasin"
        value={
          magasin === 0
            ? ""
            : newOptions.find((option: any) => option.id === magasin)?.name
        }
        setValue={(value: string) => {
          const selectedOption = newOptions.find(
            (option: any) => option.name === value
          );
          const valueId = selectedOption ? selectedOption.id : 0;
          setMagasin(valueId);
        }}
      />
    </div>
  );
};


export default Magasin;
