import Authenticated from "@/components/guard/Authenticated";
import Guest from "@/components/guard/Guest";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <p>Not found</p>
      </>
    ),
  },
  {
    path: "/",
    element: (
      <Authenticated>
        <Home />
      </Authenticated>
    ),
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />,
      </Guest>
    ),
  },
  {
    path: "/register",
    element: (
      <Guest>
        <Register />
      </Guest>
    ),
  },
]);

export default router;
