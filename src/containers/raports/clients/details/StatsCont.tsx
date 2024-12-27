import StatsComp from "../../../../components/rapport/StatsComp";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";


interface Props {
    achatStat: number;
    venteStat: number;
}


const StatsCont = ({ achatStat, venteStat }: Props) => {
    


  return (
    <section className="mt-5 flex gap-5 lg:mt-10">
      <StatsComp
        title="Achats"
        Icon={CiShoppingCart}
        value={achatStat.toString() + " " + "DA"}
      />
      <StatsComp
        title="Ventes"
        Icon={MdOutlineShoppingCartCheckout}
        value={(venteStat).toString() + " " + "DA"}
      />
    </section>
  );
}

export default StatsCont
