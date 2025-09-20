import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication.jsx";
import { action as logoutAction } from "./pages/Logout.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    
      <RouterProvider router={router} />
    
  );
}
export default App;
