import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";
import { loader as expensesLoader } from "./pages/Home.jsx";
import NewTransaction, {
  loader as newTrsLoader,
  action as newTrsAction,
} from "./pages/NewTransaction.jsx";

import EditTransaction, {
  loader as editTrsLoader,
  action as editTrsAction,
} from "./pages/EditTransaction.jsx";

import { action as deleteTrsAction } from "./pages/DeleteTransaction.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: expensesLoader },
      { path: "/auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "transactions/new",
        element: <NewTransaction />,
        loader: newTrsLoader,
        action: newTrsAction,
      },
      {
        path: "transactions/:id/edit",
        element: <EditTransaction />,
        loader: editTrsLoader,
        action: editTrsAction,
      },
      {
        path: "transactions/:id/delete",
        action: deleteTrsAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
