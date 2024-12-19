// import TextField from "@mui/material/TextField";
// import { FormHelperText } from "@mui/material";
// import { forwardRef } from "react";
// import Label from "../Label";
// import { FaBarcode } from "react-icons/fa";

// interface DesignationProps {
//     register: any;
//     errors: any;
//     id: string;
//     setValue: (value: string) => void;
//     value: string;
// }

// const CodeBarre = ({register, errors, id, value, setValue }: DesignationProps) => {
//     return (
//       <div className="bg-red200 flex flex-col gap-3">
//         <Label id={id} text={"Code Produit*"} />
//         <InputText
//           value={value}
//           setValue={setValue}
//           label="Entrez le code produit"
//           id={id}
//           register={register}
//           error={!!errors[id]}
//           helperText={errors[id]?.message}
//         />
//       </div>
//     );
// };

// interface InputTextProps {
//     value: string;
//     setValue: (value: string) => void;
//     label: string;
//     id: string;
//     register: any;
//     error: boolean;
//     helperText: string;
// }

// const InputText = forwardRef<HTMLInputElement, InputTextProps>(
//     ({ value, setValue, label, id, register, error, helperText }, ref) => {
//         const mainColor = "#006233";

//         const createBarcode = (e: any) => {
//             e.stopPropagation();
//             e.preventDefault();
//             const timestamp = Date.now().toString();
//             const randomNum = Math.floor(Math.random() * 1000)
//                 .toString()
//                 .padStart(3, "0");
//             const barcode = (timestamp + randomNum).slice(-10);
//             setValue(barcode);
//         };

//         return (
//           <div className="relative bg-green200">
//             <TextField
//               inputRef={ref}
//               label={label}
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               variant="outlined"
//               fullWidth
//               error={error}
//             //   helperText={helperText}
//               {...register(id, {
//                 required: "Ce champ est obligatoire",
//                 onChange: (e: any) => setValue(e.target.value),
//               })}
//               inputProps={{
//                 readOnly: true,
//               }}
//               id={id}
//               sx={{
//                 "& input": {
//                   color: "black",
//                 },
//                 "& label.Mui-focused": {
//                   color: mainColor,
//                 },
//                 "& label": {
//                   color: "grey",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: mainColor,
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "grey",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: mainColor,
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: mainColor,
//                   },
//                 },
//               }}
//                 />
                
//             <FormHelperText error={error}>{helperText}</FormHelperText>
//             <button
//               className="absolute top-[28px] -translate-y-[50%] right-3"
//               onClick={createBarcode}
//             >
//               <FaBarcode />
//             </button>
//           </div>
//         );
//     }
// );

// export default CodeBarre;

import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import { forwardRef } from "react";
import Label from "../../../ui/Label";
import { FaBarcode } from "react-icons/fa";

interface DesignationProps {
        register: any;
        errors: any;
        id: string;
        setValue: (value: string) => void;
        value: string;
        clearErrors: (name: string) => void;
}

const CodeBarre = ({ register, errors, id, value, setValue, clearErrors }: DesignationProps) => {
        return (
            <div className="bg-red200 flex flex-col gap-3">
                <Label id={id} text={"Code Produit*"} />
                <InputText
                    value={value}
                    setValue={(val: string) => {
                            setValue(val);
                            clearErrors(id);
                    }}
                    label="Entrez le code produit"
                    id={id}
                    register={register}
                    error={!!errors[id]}
                    helperText={errors[id]?.message}
                />
            </div>
        );
};

interface InputTextProps {
        value: string;
        setValue: (value: string) => void;
        label: string;
        id: string;
        register: any;
        error: boolean;
        helperText: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
        ({ value, setValue, label, id, register, error, helperText }, ref) => {
                const mainColor = "#006233";

                const createBarcode = (e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const timestamp = Date.now().toString();
                        const randomNum = Math.floor(Math.random() * 1000)
                                .toString()
                                .padStart(3, "0");
                        const barcode = (timestamp + randomNum).slice(-10);
                        setValue(barcode);
                };

                return (
                    <div className="relative bg-green200">
                        <TextField
                            inputRef={ref}
                            label={label}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            variant="outlined"
                            fullWidth
                            error={error}
                            {...register(id, {
                                required: "Ce champ est obligatoire",
                                onChange: (e: any) => setValue(e.target.value),
                            })}
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
                        <FormHelperText error={error}>{helperText}</FormHelperText>
                        <button
                            className="absolute top-[28px] -translate-y-[50%] right-3"
                            onClick={createBarcode}
                        >
                            <FaBarcode />
                        </button>
                    </div>
                );
        }
);

export default CodeBarre;