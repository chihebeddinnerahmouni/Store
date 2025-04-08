import ButtonsCont from "../containers/dashbored/ButtonsCont"
import StatsCont from "../containers/dashbored/StatsCont";
import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query"

const url = import.meta.env.VITE_BASE_URL;
const fetshData = async () => {
  const { data } = await axios.get(`${url}/api/dashboard`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
}

const Dashbored = () => {
  const { data } = useSuspenseQuery<any>({
    queryKey: ["dashboard-data"],
    queryFn: fetshData,
  });

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <ButtonsCont
        data={data.data.totals}
        />
      <StatsCont
        venteAchatsemaine={data.data.vente_achat_chart}
        pieChartData={data.data.pie_chart}
        alerteData={data.data.alert_products_list}
        recentVente={data.data.last_sold_products}
      />
    </div>
  );
}

export default Dashbored



