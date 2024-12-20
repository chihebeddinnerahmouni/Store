import { Checkbox, FormControlLabel } from '@mui/material';
// import { useState } from 'react';
// import InputNumber from '../../../ui/inputs/InputNumber';

interface NumSerieProps {
    value: boolean;
    setValue: (value: boolean) => void;
}


const NumSerie = ({value, setValue}: NumSerieProps) => {
    // const [haveNumSerie, setHaveNumSerie] = useState<boolean>(false);
    const mainColor = "#006233";

    return (
        <div className="cardCss">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(e) => setValue(e.target.checked)}
                        sx={{
                            color: mainColor,
                            '&.Mui-checked': {
                                color: mainColor,
                            },
                        }}
                    />
                }
                label="Le produit a un numéro de série ?"
            />
            {/* {haveNumSerie && (
                <div className="mt-3">
                    <InputNumber value={value} setValue={setValue} label="Numéro de série" />
                </div>
            )} */}
        </div>
    );
}

export default NumSerie;