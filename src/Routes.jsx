import App from "./App";
import Cart from "./Components/cart";
import Home from "./Components/home";
import Shop from "./Components/shop";

const routes = [
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
];

export default routes;