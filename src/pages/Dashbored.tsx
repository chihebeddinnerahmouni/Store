import ButtonsCont from "../containers/dashbored/ButtonsCont"
import StatsCont from "../containers/dashbored/StatsCont";
import {
  // useState,
  useEffect
} from "react";
import axios from "axios";



const Dashbored = () => {

  // const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => { 
    axios
      .get(`${url}/api/categories`, {
        headers: {
          Authorization: `Bearer 2|hDNU7sEN98s0JLVk4x3LcYFl5ZET2rrIaO9vSXgA387ca69a`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <ButtonsCont />
      <StatsCont />
    </div>
  );
}

export default Dashbored
