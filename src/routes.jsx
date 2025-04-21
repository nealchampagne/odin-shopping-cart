import App from "./App";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App page="home" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <App page="shop" />
  },
  {
    path: "cart",
    element: <App page="cart" />
  }
];

export default routes;