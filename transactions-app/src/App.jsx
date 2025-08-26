import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSideBarOpen(false)} />
      <Home />
      <button
        onClick={() => setSideBarOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 bg-blue-950 text-stone-50 p-2 rounded shadow"
      >
        ☰
      </button>
    </>
  );
}

export default App;
