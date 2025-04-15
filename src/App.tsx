import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";


export const PrivilegesContext = createContext<any>(Object.create(null));

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const res = await axios.get<{ privileges : any, user: any }>(`${url}/api/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(res.data);
  return res.data;
}


function App() {

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchData,
  })

  useEffect(() => { 
    const newError = error as any;
    if (newError && newError.status === 401) {
      navigate("/login")
    };
  }, [error]);

  if (isLoading) return null
  if (error) return null

  return (
    <PrivilegesContext.Provider value={data?.privileges}>
        <NavBar dataArray={data?.privileges} user={data?.user} />
        <Outlet />
    </PrivilegesContext.Provider>
  );
}

export default App;
