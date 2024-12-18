import SemaineComp from "../../components/dashbored/SemaineComp"
import PlusVendue from "./PlusVendue"

const StatsCont = () => {
  return (
    <section className="mt-10 lg:mt-14">
      {/* <div className="grid grid-cols-1 gap-6 max-h-[180px] md:max-h-80 lg:max-h-[390px] lg:grid-cols-12 lg:items-star"> */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:items-start">
        <SemaineComp />
        <PlusVendue />
      </div>
    </section>
  );
}

export default StatsCont
