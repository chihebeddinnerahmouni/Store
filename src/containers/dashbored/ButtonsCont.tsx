import ButtonTop from "../../components/dashbored/ButtonTop"

const ButtonsCont = () => {
  return (
      <div className="w-full grid grid-cols-2 gap-2 pt-5 md:grid-cols-4 lg:pt-10 lg:gap-6">
          
            {array_buttons.map((item) => (
                <ButtonTop
                key={item.id}
                title={item.title}
                icon={item.icon}
                url={item.url}
                />
            ))}
      
    </div>
  )
}

export default ButtonsCont

const array_buttons = [
  {
    id: 2,
    title: "Produits",
    icon: "/menu/cars-for-sale.png",
    url: "cars-for-sale",
    blank: false,
  },
  {
    id: 3,
    title: "Achats",
    icon: "/menu/sell-your-car.png",
    url: "sell-your-car",
    blank: true,
  },
  {
    id: 4,
    title: "Ventes",
    icon: "/menu/service.png",
    url: "service",
    blank: false,
  },
  {
    id: 6,
    title: "Rapports",
    icon: "/menu/blog.png",
    url: "blog",
    blank: false,
  },
];
