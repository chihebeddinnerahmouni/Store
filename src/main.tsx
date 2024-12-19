import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from './Test';
import Dashbored from './pages/Dashbored';
import AddProduct from './pages/products/AddProduct';
import Products from './pages/products/Products';
import Categories from './pages/products/Categories';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashbored /> },
      { path: "/ajouter-un-produit", element: <AddProduct /> },
      { path: "/produits", element: <Products /> },
      { path: "/produits/categories", element: <Categories /> },
    ],
  },
  { path: "/test", element: <Test /> },
]);


createRoot(document.getElementById("root")!).render(
  <> 
    <RouterProvider router={router} />
  </>
);
