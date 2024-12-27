import StatsComp from "../../../../components/rapport/StatsComp";
import { CiCoinInsert } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";


interface Props {
    data: any;
}


const StatsCont = ({ data }: Props) => {

  // console.log(data);
    


  return (
    <section className="mt-5 flex gap-5 pb-2 overflow-auto lg:mt-10">
      <StatsComp
        title="Coût total"
        Icon={CiCoinInsert}
        value={data.total_cost.toString() + " " + "DA"}
      />
      <StatsComp
        title="Achats"
        Icon={CiShoppingCart}
        value={data.total_achats.toString()}
      />
    </section>
  );
}

export default StatsCont
