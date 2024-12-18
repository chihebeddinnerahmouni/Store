import TextField from "@mui/material/TextField";
import { forwardRef } from "react";
import Label from "../Label";
import { FaBarcode } from "react-icons/fa";

interface DesignationProps {
    id: string;
    setValue: (value: string) => void;
    value: string;
}

const CodeBarre = ({ id, value, setValue }: DesignationProps) => {
    return (
        <div className="bg-red200 flex flex-col gap-3">
            <Label id={id} text={"Code Produit"} />
            <InputText
                value={value}
                setValue={setValue}
                label="Entrez le code produit"
                id={id}
            />
        </div>
    );
};

interface InputTextProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    id: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
    ({ value, setValue, label, id }, ref) => {
        const mainColor = "#006233";

        const createBarcode = (e: any) => {
            e.stopPropagation();
            const timestamp = Date.now().toString();
            const randomNum = Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0");
            const barcode = (timestamp + randomNum).slice(-10);
            setValue(barcode);
        };

        return (
            <div className="relative">
                <TextField
                    inputRef={ref}
                    label={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                        readOnly: true,
                    }}
                    id={id}
                    sx={{
                        "& input": {
                            color: "black",
                        },
                        "& label.Mui-focused": {
                            color: mainColor,
                        },
                        "& label": {
                            color: "grey",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: mainColor,
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "grey",
                            },
                            "&:hover fieldset": {
                                borderColor: mainColor,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: mainColor,
                            },
                        },
                    }}
                />
                <button
                    className="absolute top-[50%] -translate-y-[50%] right-3"
                    onClick={createBarcode}
                >
                    <FaBarcode />
                </button>
            </div>
        );
    }
);

export default CodeBarre;