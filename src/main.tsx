import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from './Test';
import Dashbored from './pages/Dashbored';
import AddProduct from './pages/products/AddProduct';
import Products from './pages/products/Products';
import Categories from './pages/products/Categories';
import Marques from './pages/products/Marques';
import Unite from './pages/products/Unite';
import AddAchat from './pages/achat/AddAchat';
import Achats from './pages/achat/Achats';
import AddVente from './pages/vente/AddVente';
import Vents from './pages/vente/Vents';
import Clients from './pages/gens/Clients';
import Fournisseurs from './pages/gens/Fournisseurs';
import RetourVantes from './pages/retour/RetourVantes';
import RetourAchats from './pages/retour/RetourAchats';
import Login from './pages/auth/Login';
import Reyonnage from './pages/products/Reyonnage';
import EditProduct from './pages/products/EditProduct';
import Magasins from './pages/products/Magasins';
import AlertProduit from './pages/rapport/AlertProduit';
import EntrepotsReport from './pages/rapport/EntrepotsReport';
import Inventaire from './pages/rapport/inventaire/Inventaire';
import ProduitsReport from './pages/rapport/produit/ProduitsReport';
import DetailsProduct from "./pages/rapport/produit/DetailsProduct";
import Ventes from './pages/rapport/Ventes';
import VenteProduit from './pages/rapport/VenteProduit';
import AchatsReport from './pages/rapport/Achats';
import AchatsProduits from './pages/rapport/AchatsProduits';
import ClientsReport from './pages/rapport/clients/clients/ClientsReport';
import ClientDetails from './pages/rapport/clients/client details/ClientDetails';
import FournisseursReport from './pages/rapport/fournisseur/Fournisseurs';
import FournisseurDetails from './pages/rapport/fournisseur/FournisseurDetails';
import BestSell from './pages/rapport/BestSell';
import BestClients from './pages/rapport/BestClients';
import Permissions from './pages/settings/Permissions';
import AchatDetails from './pages/achat/AchatDetails';
import VenteDetails from './pages/vente/VenteDetails';
import NoPage from './pages/NoPage';
import Users from './pages/gens/Users';
import ServerUp from './pages/ServerUp';
import Register from './pages/auth/Register';
import { SnackbarProvider } from "notistack";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/tableau-de-bord", element: <Dashbored /> },
      { path: "/produits/ajouter-un-produit", element: <AddProduct /> },
      { path: "/produits", element: <Products /> },
      { path: "/produits/categories", element: <Categories /> },
      { path: "/produits/marques", element: <Marques /> },
      { path: "/produits/unite", element: <Unite /> },
      { path: "/produits/reyonnage", element: <Reyonnage /> },
      { path: "/produits/magasins", element: <Magasins /> },
      {
        path: "/produits/modifier-produit/:produitId",
        element: <EditProduct />,
      },

      { path: "/achats/ajouter-un-achat", element: <AddAchat /> },
      { path: "/achats", element: <Achats /> },
      { path: "/achats/details/:achatId", element: <AchatDetails /> },

      { path: "/ventes/ajouter-un-vente", element: <AddVente /> },
      { path: "/ventes", element: <Vents /> },
      { path: "/ventes/details/:venteId", element: <VenteDetails /> },

      { path: "/gens/clients", element: <Clients /> },
      { path: "/gens/fournisseurs", element: <Fournisseurs /> },
      { path: "/gens/utilisateurs", element: <Users /> },

      { path: "/retour/retour-des-ventes", element: <RetourVantes /> },
      { path: "/retour/retour-des-achats", element: <RetourAchats /> },

      { path: "/rapports/alerte-produit", element: <AlertProduit /> },
      { path: "/rapports/entrepot", element: <EntrepotsReport /> },
      { path: "/rapports/inventaire", element: <Inventaire /> },
      { path: "/rapports/inventaire/:produitId", element: <Inventaire /> },
      { path: "/rapports/produits", element: <ProduitsReport /> },
      { path: "/rapports/produits/:produitId", element: <DetailsProduct /> },
      { path: "/rapports/ventes", element: <Ventes /> },
      { path: "/rapports/vente-produits", element: <VenteProduit /> },
      { path: "/rapports/achats", element: <AchatsReport /> },
      { path: "/rapports/achats-produits", element: <AchatsProduits /> },
      { path: "/rapports/clients", element: <ClientsReport /> },
      { path: "/rapports/clients/:clientId", element: <ClientDetails /> },
      { path: "/rapports/fournisseurs", element: <FournisseursReport /> },
      {
        path: "/rapports/fournisseurs/:fournisseurId",
        element: <FournisseurDetails />,
      },
      { path: "/rapports/plus-vendus", element: <BestSell /> },
      { path: "/rapports/meilleur-clients", element: <BestClients /> },
      {
        path: "/symloop/hidding-settings/permissions",
        element: <Permissions />,
      },
    ],
  },
  { path: "/", element: <ServerUp /> },
  { path: "/test", element: <Test /> },
  { path: "/login", element: <Login /> },
  // { path: "/testserver", element: <ServerUp /> },
  { path: "/symloop/hidding-auth/register", element: <Register /> },
  {
    path: "*",
    element: <NoPage />,
  },
]);


createRoot(document.getElementById("root")!).render(
  <>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={3000}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </>
);
