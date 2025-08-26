import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const [sideBarOpen, setSideBar] = useState(false);
  return (
    <>
      <Header />
      <Sidebar />
      <Home />

      
    </>
  );
}

export default App;
