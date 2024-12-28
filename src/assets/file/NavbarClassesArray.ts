import { IoPricetagsOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandAbstract } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
import { PiWarehouseLight } from "react-icons/pi";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { IoManOutline } from "react-icons/io5";
// import { IoBackspaceOutline } from "react-icons/io5";
// import { IoReturnUpBack } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { CiShop } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

const array = [
  {
    id: 2,
    title: "Produits",
    icon: IoPricetagsOutline,
    url: "",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Ajouter un produit",
        icon: IoAddCircleOutline,
        url: "/produits/ajouter-un-produit",
      },
      {
        id: 2,
        title: "Liste des produits",
        icon: CiCircleList,
        url: "produits",
      },
      {
        id: 3,
        title: "Categories",
        icon: MdOutlineCategory,
        url: "/produits/categories",
      },
      {
        id: 4,
        title: "Marques",
        icon: TbBrandAbstract,
        url: "/produits/marques",
      },
      {
        id: 5,
        title: "Unité",
        icon: CiBoxes,
        url: "/produits/unite",
      },
      {
        id: 6,
        title: "Reyonnage",
        icon: PiWarehouseLight,
        url: "/produits/reyonnage",
      },
      {
        id: 7,
        title: "Magasins",
        icon: CiShop,
        url: "/produits/magasins",
      },
    ],
  },
  {
    id: 3,
    title: "Achats",
    icon: CiShoppingCart,
    url: "",
    blank: true,
    subList: [
      {
        id: 1,
        title: "Ajouter D'achat",
        icon: IoAddCircleOutline,
        url: "/achats/ajouter-un-achat",
      },
      {
        id: 2,
        title: "Liste des Achats",
        icon: CiCircleList,
        url: "/achats",
      },
    ],
  },
  {
    id: 4,
    title: "Ventes",
    icon: MdOutlineShoppingCartCheckout,
    url: "",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Ajouter une vente",
        icon: IoAddCircleOutline,
        url: "/ventes/ajouter-un-vente",
      },
      {
        id: 2,
        title: "Liste des Ventes",
        icon: CiCircleList,
        url: "/ventes",
      },
    ],
  },
  {
    id: 5,
    title: "Gens",
    icon: IoPeopleOutline,
    url: "",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Clients",
        icon: IoManOutline,
        url: "/gens/clients",
      },
      {
        id: 2,
        title: "Fournisseurs",
        icon: IoManOutline,
        url: "/gens/fournisseurs",
      },
    ],
  },
  // {
  //   id: 6,
  //   title: "Retour",
  //   icon: IoBackspaceOutline,
  //   url: "about-us",
  //   blank: false,
  //   subList: [
  //     {
  //       id: 1,
  //       title: "Retour des ventes",
  //       icon: IoReturnUpBack,
  //       url: "/retour/retour-des-ventes",
  //     },
  //     {
  //       id: 1,
  //       title: "Retour des achats",
  //       icon: IoReturnUpBack,
  //       url: "/retour/retour-des-achats",
  //     },
  //   ],
  // },
  {
    id: 7,
    title: "Rapports",
    icon: TbReportSearch,
    url: "",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Alertes de quantité de produits",
        icon: IoDocumentTextOutline,
        url: "/rapports/alerte-produit",
      },
      {
        id: 2,
        title: "Rapport d'entrepôt",
        icon: IoDocumentTextOutline,
        url: "/rapports/entrepot",
      },
      {
        id: 3,
        title: "Rapport d'inventaire",
        icon: IoDocumentTextOutline,
        url: "/rapports/inventaire",
      },
      {
        id: 4,
        title: "Rapport de produit",
        icon: IoDocumentTextOutline,
        url: "/rapports/produits",
      },
      {
        id: 5,
        title: "Rapport de vente",
        icon: IoDocumentTextOutline,
        url: "/rapports/ventes",
      },
      {
        id: 6,
        title: "Rapport de vente de produits",
        icon: IoDocumentTextOutline,
        url: "/rapports/vente-produits",
      },
      {
        id: 7,
        title: "Rapport des achats",
        icon: IoDocumentTextOutline,
        url: "/rapports/achats",
      },
      {
        id: 8,
        title: "Rapport des achats de produits",
        icon: IoDocumentTextOutline,
        url: "/rapports/achats-produits",
      },
      {
        id: 9,
        title: "Rapport de clients",
        icon: IoDocumentTextOutline,
        url: "/rapports/clients",
      },
      {
        id: 10,
        title: "Rapport de fournisseurs",
        icon: IoDocumentTextOutline,
        url: "/rapports/fournisseurs",
      },
      {
        id: 11,
        title: "Produits les plus vendus",
        icon: IoDocumentTextOutline,
        url: "/rapports/plus-vendus",
      },
      {
        id: 12,
        title: "Meilleur clients",
        icon: IoDocumentTextOutline,
        url: "/rapports/meilleur-clients",
      },
    ],
  },
  {
    id: 8,
    title: "Paramétres",
    icon: CiSettings,
    url: "",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Autorisations",
        icon: IoDocumentTextOutline,
        url: "/paramétres/autorisations",
      },
    ],
  },
];

export default array;
