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
]);

export default router;
