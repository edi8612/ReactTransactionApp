import { redirect } from "react-router-dom";
import { apiFetch } from "../lib/api";

export async function action({ params }) {
  const { id } = params;

  const res = await apiFetch(`/expenses/${id}`, { method: "DELETE" });

  if (res.status === 401 || res.status === 403) return redirect("/auth");
  if (!res.ok) {
    return new Response(JSON.stringify(res.data ?? { error: "Failed to delete expense" }), {
      status: res.status || 500,
    });
  }

  return redirect("/"); // Home loader runs again, list refreshes
}
