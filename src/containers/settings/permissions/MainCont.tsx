import { Checkbox, FormControlLabel } from '@mui/material';

interface MainContProps {
    permissionsArray: { id: number; name: string }[];
    chosenPermissions: number[];
    setChosenPermissions: (value: number[]) => void;
}

const MainCont = ({ permissionsArray, chosenPermissions, setChosenPermissions }: MainContProps) => {
    const handleCheckboxChange = (id: number) => {
        if (chosenPermissions.includes(id)) {
            setChosenPermissions(chosenPermissions.filter(permissionId => permissionId !== id));
        } else {
            setChosenPermissions([...chosenPermissions, id]);
        }
    };

    const formatLabel = (label: string) => {
        return label
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };


    const mainColor = "#006233";
    // console.log(chosenPermissions);

    return (
      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-10">
        {/* <FormGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}

        {permissionsArray.map((permission) => (
          <FormControlLabel
            key={permission.id}
            control={
              <Checkbox
                sx={{
                  color: mainColor,
                  "&.Mui-checked": {
                    color: mainColor,
                  },
                }}
                checked={chosenPermissions.includes(permission.id)}
                onChange={() => handleCheckboxChange(permission.id)}
              />
            }
            label={formatLabel(permission.name)}
          />
        ))}
        {/* </FormGroup> */}
      </section>
    );
};

export default MainCont;