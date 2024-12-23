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
      { path: "/produits/modifier-produit/:produitId", element: <EditProduct /> },

      { path: "/achats/ajouter-un-achat", element: <AddAchat /> },
      { path: "/achats", element: <Achats /> },

      { path: "/ventes/ajouter-un-vente", element: <AddVente /> },
      { path: "/ventes", element: <Vents /> },

      { path: "/gens/clients", element: <Clients /> },
      { path: "/gens/fournisseurs", element: <Fournisseurs /> },

      { path: "/retour/retour-des-ventes", element: <RetourVantes /> },
      { path: "/retour/retour-des-achats", element: <RetourAchats /> },

      { path: "/rapports/paiment-des-achats", element: <Fournisseurs /> },
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
