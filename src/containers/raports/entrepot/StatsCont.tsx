import StatsComp from "../../../components/rapport/StatsComp";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";


interface Props {
    data: any
}


const StatsCont = ({ data }: Props) => {
    
  return (
    <section className="mt-5 flex gap-5 pb-2 overflow-auto lg:mt-10">
      <StatsComp
        title="Achats"
        Icon={CiShoppingCart}
        value={data.total_achats.toString() + " " + "DA"}
      />
      <StatsComp
        title="Ventes"
        Icon={MdOutlineShoppingCartCheckout}
        value={data.total_ventes.toString() + " " + "DA"}
      />
    </section>
  );
}

export default StatsCont
