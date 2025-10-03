import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => cleanup());

vi.mock("../../src/context/AuthContext", () => ({ useAuth: vi.fn() }));
// vi.mock("../../src/components/Transactions/Transactions.module.css", () => ({}), {
//   virtual: true,
// });

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Form: ({ children, ...props }) => <form {...props}>{children}</form>,
  };
});

import { useAuth } from "../../src/context/AuthContext";
import Transaction from "../../src/components/Transactions/Transactions";

const tx = {
  id: "tx-123",
  title: "Coffee",
  category: "Food & Drink",
  amount: -3.5,
  date: "2025-10-01",
};

function renderTx() {
  return render(
    <MemoryRouter>
      <Transaction transaction={tx} />
    </MemoryRouter>
  );
}

describe("Transaction component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders transaction details (title, amount, category, date)", () => {
    useAuth.mockReturnValue({ isAuthed: false, loading: false });

    renderTx();

    // Title
    expect(screen.getByText(/coffee/i)).toBeInTheDocument();

    // Category label and value
    expect(screen.getByText(/category:/i)).toBeInTheDocument();
    expect(screen.getByText(/food & drink/i)).toBeInTheDocument();

    // Date label and value
    expect(screen.getByText(/date:/i)).toBeInTheDocument();
    expect(screen.getByText("2025-10-01")).toBeInTheDocument();

    const amountEl = screen.getByText(
      (content) => /\$/.test(content) && /3\.50/.test(content)
    );
    expect(amountEl).toBeInTheDocument();
  });

  it("does NOT show Edit/Delete when not authenticated", () => {
    useAuth.mockReturnValue({ isAuthed: false, loading: false });

    renderTx();

    expect(screen.queryByRole("link", { name: /edit/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /delete/i })).toBeNull();
  });

  it("does NOT show Edit/Delete while loading", () => {
    useAuth.mockReturnValue({ isAuthed: true, loading: true });

    renderTx();

    expect(screen.queryByRole("link", { name: /edit/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /delete/i })).toBeNull();
  });

  it("shows Edit/Delete when authenticated and not loading", () => {
    useAuth.mockReturnValue({ isAuthed: true, loading: false });

    renderTx();

    // Edit link visible & points to the right URL
    const editLink = screen.getByRole("link", { name: /edit/i });
    expect(editLink).toBeInTheDocument();
    expect(editLink).toHaveAttribute("href", `/transactions/${tx.id}/edit`);

    // Delete button visible (type submit)
    const delBtn = screen.getByRole("button", { name: /delete/i });
    expect(delBtn).toBeInTheDocument();
    expect(delBtn).toHaveAttribute("type", "submit");
  });

  it("asks for confirmation when Delete is clicked", () => {
    useAuth.mockReturnValue({ isAuthed: true, loading: false });

    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

    renderTx();

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(confirmSpy).toHaveBeenCalled();

    confirmSpy.mockRestore();
  });
});
