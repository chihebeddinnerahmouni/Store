import ButtonsCont from "../containers/dashbored/ButtonsCont"
import StatsCont from "../containers/dashbored/StatsCont";




const Dashbored = () => {
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
    {/* <div className="mainCss"> */}
      <ButtonsCont />
      <StatsCont />
    </div>
  );
}

export default Dashbored
