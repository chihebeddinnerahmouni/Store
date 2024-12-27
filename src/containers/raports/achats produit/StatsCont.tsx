import StatsComp from "../../../components/rapport/StatsComp";
import { CiBoxes } from "react-icons/ci";
import { CiCoinInsert } from "react-icons/ci";


interface Props {
    data: any;
}


const StatsCont = ({ data }: Props) => {
    

  return (
    <section className="mt-5 flex gap-5 overflow-auto pb-2 lg:mt-10">
      <StatsComp
        title="Coût total"
        Icon={CiCoinInsert}
        value={data.total_cost + " " + "DA"}
      />
      <StatsComp
        title="Quantité total"
        Icon={CiBoxes}
        value={(data.total_quantity).toFixed()}
      />
    </section>
  );
}

export default StatsCont
