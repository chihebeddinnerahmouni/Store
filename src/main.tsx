import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from './Test';
import Dashbored from './pages/Dashbored';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashbored /> },
    ],
  },
  {path: "/test", element: <Test/>}
]);


createRoot(document.getElementById("root")!).render(
  <> 
    <RouterProvider router={router} />
  </>
);
