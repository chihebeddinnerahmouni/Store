import SelectInput from "../../../ui/inputs/SelectInput";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const Category = () => {
  const { category, setCategory, categoriesArray } = useContext(VentsContext);

    // console.log(categoriesArray);

  const newOptions = categoriesArray.map((option: any) => ({
    id: option.id,
    name: option.name_category,
  }));

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterProductsFourni"} text={"Categorie"} />
      <SelectInput
        options={newOptions}
        label="Selectionner une categorie"
        value={
          category === 0
            ? ""
            : newOptions.find((option: any) => option.id === category)?.name
        }
        setValue={(value: string) => {
          const selectedOption = newOptions.find(
            (option: any) => option.name === value
          );
          const valueId = selectedOption ? selectedOption.id : 0;
          setCategory(valueId);
        }}
      />
    </div>
  );
};


export default Category;
