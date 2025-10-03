import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter, Outlet } from "react-router-dom";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// Mocks
vi.mock("../../src/context/AuthContext", () => ({ useAuth: vi.fn() }));
vi.mock("../../src/assets/icons", () => ({
  MenuIcon: () => <svg data-testid="menu-icon" />,
  CloseIcon: () => <svg data-testid="close-icon" />,
}));

// vi.mock("@/Sidebar/Sidebar.module.css", () => ({}), { virtual: true });

import { useAuth } from "../../src/context/AuthContext";
import Sidebar from "../../src/components/Sidebar/Sidebar";

function Shell() {
  return (
    <div>
      <Sidebar />
      <main data-testid="page">
        <Outlet />
      </main>
    </div>
  );
}

function renderWithRouter(
  { isAuthed, loading = false, logout = vi.fn() },
  initialPath = "/"
) {
  useAuth.mockReturnValue({ isAuthed, loading, logout });

  const routes = [
    {
      path: "/",
      element: <Shell />,
      children: [
        { index: true, element: <div>Home Page</div> },
        { path: "auth", element: <div>Auth Page</div> },
        { path: "transactions/new", element: <div>New Tx Page</div> },
      ],
    },
  ];

  const router = createMemoryRouter(routes, { initialEntries: [initialPath] });
  render(<RouterProvider router={router} />);
  return { router, logout };
}

describe("Sidebar navigation & visibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("guest: shows Home + Login/Signup and navigates to /auth", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter({ isAuthed: false, loading: false });

    // Only guest options visible
    const nav = screen.getByRole("navigation");
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(nav).toContainElement(screen.getByRole("link", { name: /home/i }));
    expect(nav).toContainElement(
      screen.getByRole("link", { name: /login\/signup/i })
    );
    expect(
      screen.queryByRole("link", { name: /create new transaction/i })
    ).toBeNull();
    expect(screen.queryByRole("button", { name: /logout/i })).toBeNull();

    // Click Login/Signup -> goes to /auth
    await user.click(screen.getByRole("link", { name: /login\/signup/i }));
    expect(router.state.location.pathname).toBe("/auth");
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });

  it("authed: shows Home + Create New Transaction + Logout; nav to /transactions/new", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter({ isAuthed: true, loading: false });

    const nav = screen.getByRole("navigation");

    // Visible for authed
    expect(nav).toContainElement(screen.getByRole("link", { name: /home/i }));
    expect(nav).toContainElement(
      screen.getByRole("link", { name: /create new transaction/i })
    );
    expect(nav).toContainElement(
      screen.getByRole("button", { name: /logout/i })
    );
    // Hidden for authed
    expect(screen.queryByRole("link", { name: /login\/signup/i })).toBeNull();

    // Click Create New Transaction -> goes to /transactions/new
    await user.click(
      screen.getByRole("link", { name: /create new transaction/i })
    );
    expect(router.state.location.pathname).toBe("/transactions/new");
    expect(screen.getByText("New Tx Page")).toBeInTheDocument();
  });

  it("logout button calls logout and navigates to /auth?mode=login", async () => {
    const user = userEvent.setup();
    const logout = vi.fn().mockResolvedValue(undefined);
    const { router } = renderWithRouter({
      isAuthed: true,
      loading: false,
      logout,
    });

    // Click Logout
    await user.click(screen.getByRole("button", { name: /logout/i }));

    // Assert logout called and navigation happened
    expect(logout).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname + router.state.location.search).toBe(
      "/auth?mode=login"
    );
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });
});
