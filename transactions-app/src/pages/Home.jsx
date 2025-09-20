import Transaction from "../components/Transactions/Transactions.jsx";
import { useLoaderData, redirect } from "react-router-dom";
import { apiFetch } from "../lib/api";

function toCard(e) {
  return {
    id: e.id,
    title: e.title ?? "Untitled",
    category: e.category?.name ?? "Uncategorized",
    amount: Number(e.value ?? 0), // value is a string -> number
    date: (e.createdAt ?? "").slice(0, 10), // YYYY-MM-DD
  };
}

export async function loader() {
  const res = await apiFetch("/expenses", { method: "GET" });
  if (res.status === 401 || res.status === 403) return redirect("/auth");
  if (!res.ok) {
    throw new Response(
      JSON.stringify(res.data ?? { message: "Failed to load expenses" }),
      {
        status: res.status || 500,
      }
    );
  }

  const items = (res.data || []).map(toCard);
  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  return items;
}

export default function Home() {
  const transactions = useLoaderData();
  return (
    <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-gray-100">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.length === 0 ? (
          <div className="col-span-full text-gray-500">No expenses yet.</div>
        ) : (
          transactions.map((t) => <Transaction key={t.id} transaction={t} />)
        )}
      </div>
    </main>
  );
}
