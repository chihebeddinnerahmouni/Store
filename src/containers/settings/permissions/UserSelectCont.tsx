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
        <section className="w-full">
            <SelectInput
                options={newOptions}
                label="Selectionnez l'utilisateur*"
                value={userId}
                setValue={(value: string) => {
                    setUserId(newOptions.find((option) => option.name === value)?.id || 0);
                }}
            />
        </section>
    )
};

export default UserSelectCont;
