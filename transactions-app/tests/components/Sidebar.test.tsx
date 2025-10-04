// Sidebar.test.jsx
import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContextValue, useAuth } from "../../src/context/AuthContext";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

vi.mock("../../src/context/AuthContext", () => {
  return {
    useAuth: vi.fn(),
  };
});

const baseAuth: AuthContextValue = {
  isAuthed: false,
  loading: false,
  login: vi.fn(),
  signup: vi.fn(),
  logout: vi.fn(),
  setIsAuthed: vi.fn(),
};

vi.mock("../../assets/icons", () => ({
  MenuIcon: () => <svg data-testid="menu-icon" />,
  CloseIcon: () => <svg data-testid="close-icon" />,
}));

// vi.mock("../Sidebar/Sidebar.module.css", () => ({}), { virtual: true });
vi.mock(
  "@/components/Sidebar/Sidebar.module.css",
  () => ({} as Record<string, string>)
);

vi.mock("react-router-dom", async (orig) => {
  const actual = (await orig()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import Sidebar from "../../src/components/Sidebar/Sidebar";

function renderSidebar() {
  return render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
}

describe("Sidebar conditional rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing while auth is loading", () => {
    vi.mocked(useAuth).mockReturnValue({
      ...baseAuth,
      loading: true,
    });

    const { container } = renderSidebar();
    // Component returns null, so container should be empty.
    expect(container.firstChild).toBeNull();
  });

  it("shows Login/Signup when not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      ...baseAuth,
      isAuthed: false,
    });

    renderSidebar();

    // Visible for guests
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /login\/signup/i })
    ).toBeInTheDocument();

    // Hidden for guests
    expect(
      screen.queryByRole("link", { name: /create new transaction/i })
    ).toBeNull();
    expect(screen.queryByRole("button", { name: /logout/i })).toBeNull();
  });

  it("shows Create New Transaction + Logout when authenticated, hides Login/Signup", () => {
    vi.mocked(useAuth).mockReturnValue({
      ...baseAuth,
      isAuthed: true,
    });

    renderSidebar();

    // Visible for authed users
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create new transaction/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

    // Hidden for authed users
    expect(screen.queryByRole("link", { name: /login\/signup/i })).toBeNull();
  });
});
