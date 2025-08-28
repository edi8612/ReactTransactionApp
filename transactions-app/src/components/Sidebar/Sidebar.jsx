import { useState } from "react";
import styles from "../Sidebar/Sidebar.module.css";

export default function Sidebar() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}

      <aside
        className={` ${styles.sidebarContainer}  ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <nav className={styles.navContainer}>
          <a href="#Home" className={styles.navLink}>
            Home
          </a>
          <a href="#CreateNewTransaction" className={styles.navLink}>
            Create New Transaction
          </a>
          <a href="#Login/Signup" className={styles.navLink}>
            Login/Signup
          </a>
        </nav>
      </aside>
    </>
  );
}
