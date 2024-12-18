import SemaineComp from "../../components/dashbored/SemaineComp"
import PlusVendue from "../../components/dashbored/PlusVendue"
import Alerts from "../../components/dashbored/Alerts";
import PlusVendueTable from "../../components/dashbored/PlusVendueTable";
import VenteRecente from "../../components/dashbored/VenteRecente";


const StatsCont = () => {
  return (
    <section className="mt-10 flex flex-col gap-6 lg:mt-14">
      <div className="flex flex-col gap-6 xl:flex-row ">
        <SemaineComp />
        <PlusVendue />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row ">
        <Alerts />
        <PlusVendueTable />
      </div>
      <VenteRecente />
    </section>
  );
}

export default StatsCont
