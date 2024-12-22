// import ButtonTop from "../../components/dashbored/ButtonTop"

// const ButtonsCont = () => {
//   return (
//       <div className="w-full grid grid-cols-2 gap-2 pt-5 md:grid-cols-4 lg:pt-10 lg:gap-6">
          
//             {array_buttons.map((item) => (
//                 <ButtonTop
//                 key={item.id}
//                 title={item.title}
//                 icon={item.icon}
//                 url={item.url}
//                 />
//             ))}
      
//     </div>
//   )
// }
import { IoPricetagsOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import ButtonTop from "../../components/dashbored/ButtonTop"

const ButtonsCont = () => {
  return (
      // <div className="w-full grid grid-cols-2 gap-2 pt-5 md:grid-cols-4 lg:pt-10 lg:gap-6">
      <div className="w-full gap-2 pt-5 flex overflow-auto pb-2 justify-start lg:pt-10 lg:gap-6">
          
            {array_buttons.map((item) => (
                <ButtonTop
                key={item.id}
                title={item.title}
                Icon={item.icon}
                url={item.url}
                value={item.value}
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
const array_buttons = [
  {
    id: 2,
    title: "Produits",
    icon: IoPricetagsOutline,
    url: "/produits",
    blank: false,
    value: 120000,
  },
  {
    id: 3,
    title: "Achats",
    icon: CiShoppingCart,
    url: "/achats",
    blank: true,
    value: 12000,
  },
  {
    id: 4,
    title: "Ventes",
    icon: MdOutlineShoppingCartCheckout,
    url: "/ventes",
    blank: false,
    value: 876544,
  },
  {
    id: 6,
    title: "Rapports",
    icon: TbReportSearch,
    url: "blog",
    blank: false,
    value: 1234,
  },
];
