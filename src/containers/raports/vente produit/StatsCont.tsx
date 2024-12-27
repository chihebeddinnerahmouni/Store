import StatsComp from "../../../components/rapport/StatsComp";
import { CiBoxes } from "react-icons/ci";
import { CiCoinInsert } from "react-icons/ci";


interface Props {
    data: any;
}


const StatsCont = ({ data }: Props) => {
    

console.log(data);
  return (
    <section className="mt-5 flex gap-5 lg:mt-10">
      <StatsComp
        title="montant total"
        Icon={CiCoinInsert}
        value={data.total_amount + " " + "DA"}
      />
      <StatsComp
        title="Quantité vendue"
        Icon={CiBoxes}
        value={data.total_quantity_sold}
      />
    </section>
  );
}

export default StatsCont
