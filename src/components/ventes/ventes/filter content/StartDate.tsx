import InputDate from "../../../ui/inputs/InputDate";
import Label from "../../../ui/Label";
import { useContext } from "react";
import { VentsContext } from "../../../../pages/vente/Vents";

const StartDate = () => {
  const { date, setDate } = useContext(VentsContext);

  // console.log(magasinArray);



  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatDate"} text={"Depuis"} />
      <InputDate value={date} setValue={setDate} label="Depuis" />
    </div>
  );
};


export default StartDate;
