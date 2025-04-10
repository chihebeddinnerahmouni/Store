import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { lazy, Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import FetshLoading from "../components/ui/loading/FetshLoading";
import FetchError from "../errors/FetshError";

import App from "../App";
import Test from "../Test";
import AddVente from "../pages/vente/AddVente";
import Vents from "../pages/vente/Vents";
import Clients from "../pages/gens/Clients";
import Fournisseurs from "../pages/gens/Fournisseurs";
import RetourVantes from "../pages/retour/RetourVantes";
import RetourAchats from "../pages/retour/RetourAchats";
import Login from "../pages/auth/Login";
import AlertProduit from "../pages/rapport/AlertProduit";
import EntrepotsReport from "../pages/rapport/EntrepotsReport";
import Inventaire from "../pages/rapport/inventaire/Inventaire";
import ProduitsReport from "../pages/rapport/produit/ProduitsReport";
import DetailsProduct from "../pages/rapport/produit/DetailsProduct";
import Ventes from "../pages/rapport/Ventes";
import VenteProduit from "../pages/rapport/VenteProduit";
import AchatsReport from "../pages/rapport/Achats";
import AchatsProduits from "../pages/rapport/AchatsProduits";
import ClientsReport from "../pages/rapport/clients/clients/ClientsReport";
import ClientDetails from "../pages/rapport/clients/client details/ClientDetails";
import FournisseursReport from "../pages/rapport/fournisseur/Fournisseurs";
import FournisseurDetails from "../pages/rapport/fournisseur/FournisseurDetails";
import BestSell from "../pages/rapport/BestSell";
import BestClients from "../pages/rapport/BestClients";
import Permissions from "../pages/settings/Permissions";
import VenteDetails from "../pages/vente/VenteDetails";
import NoPage from "../pages/NoPage";
import Users from "../pages/gens/Users";
import ServerUp from "../pages/ServerUp";
import Register from "../pages/auth/Register";

const Dashbored = lazy(() => import("../pages/Dashbored"));
const AddProduct = lazy(() => import("../pages/products/AddProduct"));
const Products = lazy(() => import("../pages/products/Products"));
const EditProduct = lazy(() => import("../pages/products/EditProduct"));
const Categories = lazy(() => import("../pages/products/Categories"));
const Marques = lazy(() => import("../pages/products/Marques"));
const Unites = lazy(() => import("../pages/products/Unite"));
const Reyonnages = lazy(() => import("../pages/products/Reyonnage"));
const Magasins = lazy(() => import("../pages/products/Magasins"));
const AddAchat = lazy(() => import("../pages/achat/AddAchat"));
const Achats = lazy(() => import("../pages/achat/Achats"));
const AchatDetails = lazy(() => import("../pages/achat/AchatDetails"));

export const queryClient = new QueryClient();
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/tableau-de-bord",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Dashbored />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/ajouter-un-produit",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <AddProduct />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Products />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/categories",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Categories />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/marques",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Marques />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/unite",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Unites />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/reyonnage",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Reyonnages />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/magasins",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Magasins />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/produits/modifier-produit/:produitId",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <EditProduct />
            </Suspense>
          </ErrorBoundary>
        )
      },

      {
        path: "/achats/ajouter-un-achat",
        element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <AddAchat />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/achats", element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <Achats />
            </Suspense>
          </ErrorBoundary>
      ) },
      {
        path: "/achats/details/:achatId", element: (
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={<FetshLoading />}>
              <AchatDetails />
            </Suspense>
          </ErrorBoundary>
        ),
      },

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
  { path: "/symloop/hidding-auth/register", element: <Register /> },
  {
    path: "*",
    element: <NoPage />,
  },
]);
