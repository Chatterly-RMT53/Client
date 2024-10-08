import Home from "@/pages/Home";
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
    element: <Home />,
  },
]);

export default router;
