import PageTitle from "../../components/ui/PageTitle"
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import UserSelectCont from "../../containers/settings/permissions/UserSelectCont";
import { IUser } from "../../types/settings/permissions/user";
import MainCont from "../../containers/settings/permissions/MainCont";
import SendButton from "../../containers/settings/permissions/SendButton";



const Permissions = () => {

    const [loading, setLoading] = useState(true);
    const [usersArray, setUsersArray] = useState<IUser[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [permissionsArray, setPermissionsArray] = useState<{id: number, name: string}[]>([]);
    const [chosenPermissions, setChosenPermissions] = useState<number[]>([]);
    const url = import.meta.env.VITE_BASE_URL as string;

    useEffect(() => {
        Promise.all([
            axios.get(url + "/api/user/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            axios.get(url + "/api/permissions/get-permissions", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        ])
            .then(axios.spread((users, permissions) => { 
                // console.log(users);
                // console.log(permissions);
                setUsersArray(users.data.users);
                setPermissionsArray(permissions.data.permissions);
                setLoading(false);
            }))
            .catch((err) => {
                setLoading(false);
                if (err.message === "Network Error") {
                    enqueueSnackbar("Erreur de connexion", { variant: "error" });
                } else {
                    enqueueSnackbar(err.response.data.message, {
                        variant: "error",
                    });
                }
            });
    }, []);



    if (loading) {
        return <Loading />;
    }


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
          <PageTitle text={"Créer une autorisation"} />
          <UserSelectCont
              usersArray={usersArray}
              userId={userId}
                setUserId={setUserId}
          />
            <MainCont
                permissionsArray={permissionsArray}
                chosenPermissions={chosenPermissions}
                setChosenPermissions={setChosenPermissions}
          />
          <SendButton
              chosenPermissions={chosenPermissions}
              userId={userId}
          />
    </div>
  );
}

export default Permissions
