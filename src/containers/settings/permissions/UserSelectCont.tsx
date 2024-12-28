import { IUser } from "../../../types/settings/permissions/user";
import SelectInput from "../../../components/ui/inputs/SelectInput";

interface UserSelectContProps {
    usersArray: IUser[];
    userId: number;
    setUserId: (value: number) => void;
}

const UserSelectCont = ({ usersArray, userId, setUserId }: UserSelectContProps) => {

    // console.log(usersArray);

    const newOptions = usersArray.map((option) => ({
        id: option.id,
        name: option.name + " " + option.surname,
    }));


    return (
        <section>
            <SelectInput
                options={newOptions}
                label="Selectionnez l'utilisateur*"
                value={userId === 0 ? "" : newOptions.find((option) => option.id === userId)?.name}
                setValue={(value: string) => {
                    if (value === "") {
                        setUserId(0);
                    } else {
                        setUserId(newOptions.find((option) => option.name === value)?.id as number);
                    }
                }}
            />
        </section>
    )
};

export default UserSelectCont;
