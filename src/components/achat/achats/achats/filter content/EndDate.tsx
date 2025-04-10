// import InputDate from "../../../../ui/inputs/InputDate";
// import Label from "../../../../ui/Label";
// import { useContext } from "react";
// import { AchatsContext } from "../../../../../pages/achat/Achats";

// const EndDate = () => {
//   const { endDate, setEndDate } = useContext(AchatsContext);

//   // console.log(magasinArray);

//   return (
//     <div className="bg-red200 flex flex-col gap-3">
//       <Label id={"filterAchatedDate"} text={"Jusqu'a"} />
//       <InputDate value={endDate} setValue={setEndDate} label="Jusqu'a" />
//     </div>
//   );
// };


// export default EndDate;

import InputDate from "../../../../ui/inputs/InputDate";
import Label from "../../../../ui/Label";

interface IProps {
  value: string;
  setValue: (value: string) => void;
}
const EndDate = ({ value, setValue }: IProps) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatDate"} text={"Jusqu'a"} />
      <InputDate value={value} setValue={setValue} label="Jusqu'a" />
    </div>
  );
};

export default EndDate;
