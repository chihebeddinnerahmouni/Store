import Label from "../../../ui/Label";
import InputDate from "../../../ui/inputs/InputDate";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  clearErrors: any;
  register: any;
  errors: any;
  id: string;
  setValue: (value: string) => void;
  value: string;
}

const Date = ({
  control,
  clearErrors,
  errors,
  id,
  value,
  setValue,
}: Props) => {
  return (
    <div className="bg-red200 flex flex-col gap-3">
      <Label id={id} text="Date*" />
      <Controller
        name="date"
        control={control}
        rules={{ required: "ce champ est obligatoire" }}
        render={({ field }) => (
          <InputDate
            value={value}
            label="Entrez la date"
            error={!!errors.date}
            helperText={errors.date?.message}
            setValue={(value: string) => {
              setValue(value);
              field.onChange(value);
              if (errors.date) {
                clearErrors("date");
              }
            }}
          />
        )}
      />

    </div>
  );
};

export default Date;
