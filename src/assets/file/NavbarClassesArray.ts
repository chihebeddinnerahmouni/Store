const array = [
  {
    id: 1,
    title: "Tableau de bord",
    icon: "/menu/Home.png",
    url: "",
    blank: false,
  },
  {
    id: 2,
    title: "Produits",
    icon: "/menu/cars-for-sale.png",
    url: "cars-for-sale",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Ajouter un produit",
        icon: "/menu/cars-for-sale.png",
        url: "ajouter-un-produit",
      },
      {
        id: 2,
        title: "Liste des produits",
        icon: "/menu/cars-for-sale.png",
        url: "produits",
      },
      {
        id: 3,
        title: "Categories",
        icon: "/menu/cars-for-sale.png",
        url: "/produits/categories",
      },
      {
        id: 4,
        title: "Marques",
        icon: "/menu/cars-for-sale.png",
        url: "/produits/marques",
      },
      {
        id: 5,
        title: "Unité",
        icon: "/menu/cars-for-sale.png",
        url: "/produits/unite",
      },
    ],
  },
  {
    id: 3,
    title: "Achats",
    icon: "/menu//sell-your-car.png",
    url: "sell-your-car",
    blank: true,
    subList: [
      {
        id: 1,
        title: "Ajouter D'achat",
        icon: "/menu/cars-for-sale.png",
        url: "/achats/ajouter-un-achat",
      },
      {
        id: 2,
        title: "Liste des Achats",
        icon: "/menu/cars-for-sale.png",
        url: "/achats",
      },
    ],
  },
  {
    id: 4,
    title: "Ventes",
    icon: "/menu/service.png",
    url: "service",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Ajouyer une vente",
        icon: "/menu/cars-for-sale.png",
        url: "add-product",
      },
      {
        id: 2,
        title: "Liste des Ventes",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
      {
        id: 3,
        title: "Imprimer Le Code Barre",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
    ],
  },
  {
    id: 5,
    title: "Gens",
    icon: "/menu/about-us.png",
    url: "about-us",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Clients",
        icon: "/menu/cars-for-sale.png",
        url: "add-product",
      },
      {
        id: 2,
        title: "Fournisseurs",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
      {
        id: 3,
        title: "Utilisateurs",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
    ],
  },
  {
    id: 6,
    title: "Rapports",
    icon: "/menu/blog.png",
    url: "blog",
    blank: false,
    subList: [
      {
        id: 1,
        title: "Profits et Pertes",
        icon: "/menu/cars-for-sale.png",
        url: "add-product",
      },
      {
        id: 2,
        title: "Alertes De Quantite De Produits",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
      {
        id: 3,
        title: "Rapport D'entrepot",
        icon: "/menu/cars-for-sale.png",
        url: "liste-des-produits",
      },
    ],
  },
];

export default array;
