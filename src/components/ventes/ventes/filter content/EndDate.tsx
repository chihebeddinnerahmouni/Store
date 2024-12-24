import InputDate from "../../../ui/inputs/InputDate";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";
// not used
const EndDate = () => {
  const { endDate, setEndDate } = useContext(VentsContext);

  // console.log(magasinArray);

  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatedDate"} text={"Jusqu'a"} />
      <InputDate value={endDate} setValue={setEndDate} label="Jusqu'a" />
    </div>
  );
};


export default EndDate;
