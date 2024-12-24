import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";


// not used


const Fourni = () => {
    const { fournisseur, setFournisseur, fourniArray } =
      useContext(VentsContext);
    
    const newOptions = fourniArray.map((option: any) => ({
      id: option.id,
      name: option.name,
    }));


    return (
      <div className="bg-red200 flex flex-col gap-3">
        <Label id={"filterProductsFourni"} text={"Fournisseures"} />
        <SelectInput
          options={newOptions}
          label="Par Fournisseure"
          value={
            fournisseur === 0
              ? ""
              : newOptions.find((option: any) => option.id === fournisseur)
                  ?.name
          }
          setValue={(value: string) => {
            const selectedOption = newOptions.find(
              (option: any) => option.name === value
            );
            const valueId = selectedOption ? selectedOption.id : 0;
            setFournisseur(valueId);
          }}
        />
      </div>
    );
}

export default Fourni
