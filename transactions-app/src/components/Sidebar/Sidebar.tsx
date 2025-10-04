import React, { JSX, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Sidebar/Sidebar.module.css";
import { MenuIcon, CloseIcon } from "../../assets/icons";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar(): JSX.Element | null {
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const { isAuthed, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout():Promise<void> {
    await logout?.();
    setSideBarOpen(false);
    navigate("/auth?mode=login");
  }

  const toggleSidebar = ():void => setSideBarOpen((v) => !v);
  const iconToShow = sidebarOpen ? <CloseIcon /> : <MenuIcon />;

  if (loading) return null;

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
        <div className={styles.overlay} onClick={() => setSideBarOpen(false)} />
      )}

      <aside
        className={`${styles.sidebarContainer} ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <nav className={styles.navContainer}>
          <NavLink
            to="/"
            className={styles.navLink}
            onClick={() => setSideBarOpen(false)}
          >
            Home
          </NavLink>

          {!isAuthed && (
            <NavLink
              to="/auth"
              className={styles.navLink}
              onClick={() => setSideBarOpen(false)}
            >
              Login/Signup
            </NavLink>
          )}

          {isAuthed && (
            <>
              <NavLink
                to="/transactions/new"
                className={styles.navLink}
                onClick={() => setSideBarOpen(false)}
              >
                Create New Transaction
              </NavLink>

              <button
                type="button"
                className={styles.navButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
