import { useState } from "react";
import { NavLink, Form, useNavigate } from "react-router-dom";
import styles from "../Sidebar/Sidebar.module.css";
import { MenuIcon, CloseIcon } from "../../assets/icons";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/auth?mode=login");
  }

  const toggleSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const iconToShow = sidebarOpen ? <CloseIcon /> : <MenuIcon />;

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {iconToShow}
      </button>
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}

      <aside
        className={`${styles.sidebarContainer}  ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <nav className={styles.navContainer}>
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>

          {!isAuthed && (
            <NavLink to="/auth" className={styles.navLink}>
              Login/Signup
            </NavLink>
          )}
          {isAuthed && (
            <>
              <a href="#CreateNewTransaction" className={styles.navLink}>
                Create New Transaction
              </a>
              <NavLink className={styles.navLink}>
                <button onClick={handleLogout}>Logout</button>
              </NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
