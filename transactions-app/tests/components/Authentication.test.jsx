import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../src/lib/api", () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from "../../src/lib/api";
import AuthProvider, { useAuth } from "../../src/context/AuthContext";

describe("Authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function wrapper({ children }) {
    // 👇 AuthProvider needs to sit inside a Router
    return (
      <MemoryRouter>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    );
  }

  it("logs in successfully with mock API (200)", async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      status: 200,
      data: { id: 1, email: "user@user.com" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("user@user.com", "Edi12345");
    });

    expect(result.current.isAuthed).toBe(true);
  });

  it("login fails with 401", async () => {
    apiFetch.mockResolvedValue({
      ok: false,
      status: 401,
      data: { message: "Invalid credentials" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const res = await result.current.login("bad@user.com", "wrong");
      expect(res.ok).toBe(false);
      expect(res.status).toBe(401);
    });

    expect(result.current.isAuthed).toBe(false);
  });

  it("signs up successfully (200)", async () => {
    apiFetch.mockResolvedValue({
      ok: true,
      status: 200,
      data: { id: 2, email: "new@user.com" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signup("new@user.com", "Test1234");
    });

    expect(result.current.isAuthed).toBe(true);
  });

  it("signup fails with 409", async () => {
    apiFetch.mockResolvedValue({
      ok: false,
      status: 409,
      data: { message: "Email already exists" },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const res = await result.current.signup("existing@user.com", "Test1234");
      expect(res.ok).toBe(false);
      expect(res.data.message).toBe("Email already exists");
    });

    expect(result.current.isAuthed).toBe(false);
  });
});
