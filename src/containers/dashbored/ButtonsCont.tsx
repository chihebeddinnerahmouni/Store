import { IoPricetagsOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import ButtonTop from "../../components/dashbored/ButtonTop"
import { CgDanger } from "react-icons/cg";


interface IButton {
  data: any;
}

const ButtonsCont = ({ data }: IButton) => {
  


  const array_buttons = [
    {
      id: 2,
      title: "Produits",
      icon: IoPricetagsOutline,
      url: "/produits",
      blank: false,
      value: data.products_this_week,
      tooltip: "Produits vendue cette semaine",
    },
    {
      id: 3,
      title: "Achats",
      icon: CiShoppingCart,
      url: "/achats",
      blank: true,
      value: data.total_achat_this_week + " DA",
      tooltip: "Le prix total des achats cette semaine",
    },
    {
      id: 4,
      title: "Ventes",
      icon: MdOutlineShoppingCartCheckout,
      url: "/ventes",
      blank: false,
      value: data.total_vente_this_week + " DA",
      tooltip: "Le prix total des ventes cette semaine",
    },
    {
      id: 6,
      title: "Alerts",
      icon: CgDanger,
      url: "blog",
      blank: false,
      // value: data.alert_products,
      value: 148542,
      tooltip: "Produits en rupture de stock",
    },
  ];


  return (
      <div className="w-full gap-2 pt-5 flex overflow-auto pb-2 justify-start lg:pt-10 lg:gap-6">          
            {array_buttons.map((item) => (
                <ButtonTop
                key={item.id}
                title={item.title}
                Icon={item.icon}
                url={item.url}
                value={item.value}
                tooltip={item.tooltip}
                />
            ))} 
    </div>
  )
}

export default ButtonsCont

// const array_buttons = [
//   {
//     id: 2,
//     title: "Produits",
//     icon: "/menu/cars-for-sale.png",
//     url: "cars-for-sale",
//     blank: false,
//   },
//   {
//     id: 3,
//     title: "Achats",
//     icon: "/menu/sell-your-car.png",
//     url: "sell-your-car",
//     blank: true,
//   },
//   {
//     id: 4,
//     title: "Ventes",
//     icon: "/menu/service.png",
//     url: "service",
//     blank: false,
//   },
//   {
//     id: 6,
//     title: "Rapports",
//     icon: "/menu/blog.png",
//     url: "blog",
//     blank: false,
//   },
// ];

