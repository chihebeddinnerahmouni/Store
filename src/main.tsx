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


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashbored /> },
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

      { path: "/ventes/ajouter-un-vente", element: <AddVente /> },
      { path: "/ventes", element: <Vents /> },

      { path: "/gens/clients", element: <Clients /> },
      { path: "/gens/fournisseurs", element: <Fournisseurs /> },

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
    ],
  },
  { path: "/test", element: <Test /> },
  { path: "/login", element: <Login /> },
]);


createRoot(document.getElementById("root")!).render(
  <> 
    <RouterProvider router={router} />
  </>
);
