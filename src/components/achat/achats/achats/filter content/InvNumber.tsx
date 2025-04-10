import InputText from "../../../../ui/inputs/InputText";
import Label from "../../../../ui/Label";

interface IProps {
  value: string;
  setValue: (value: string) => void;
}

const InvNumber = ({value, setValue}: IProps) => {


  return (
    <div className="bg-red200 flex flex-col gap-3">
          <Label id={"filterAchatedDate"} text={"Reference"} />
            <InputText
                value={value}
                setValue={setValue}
              label="Entrer la reference"
            />
    </div>
  );
};


export default InvNumber;
