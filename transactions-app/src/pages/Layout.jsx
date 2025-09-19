import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import AuthProvider from "../context/AuthContext.jsx";

export default function Layout() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
    </>
  );
}
