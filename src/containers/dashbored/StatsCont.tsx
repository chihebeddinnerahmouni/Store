import SemaineComp from "../../components/dashbored/SemaineComp"
import PlusVendue from "./PlusVendue"

const StatsCont = () => {
  return (
    <section className="mt-10 lg:mt-14">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <SemaineComp />
        <PlusVendue />
      </div>
    </section>
  );
}

export default StatsCont
