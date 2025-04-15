import InputDate from "../../../ui/inputs/InputDate";
import Label from "../../../ui/Label";


interface IProps {
  value: string;
  setValue: (value: string) => void;  
}
const StartDate = ({value, setValue}: IProps) => {

  // console.log(magasinArray);



  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={"filterAchatDate"} text={"Depuis"} />
      <InputDate value={value} setValue={setValue} label="Depuis" />
    </div>
  );
};


export default StartDate;
