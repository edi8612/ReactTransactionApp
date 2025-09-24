import { useLoaderData, useActionData, redirect } from "react-router-dom";
import { apiFetch } from "../lib/api";
import TransactionForm from "../components/TransactionForm/TransactionForm.jsx";

// function normalizeExpense(e) {
//   return {
//     id: e.id,
//     title: e.title ?? "Untitled",
//     value: String(e.value ?? ""),
//     categoryId: e.category?.id ?? "",
//   };
// }

export async function loader({ params }) {
  const { id } = params;

  // fetch the expense
  const expenseRes = await apiFetch(`/expense/${id}`, { method: "GET" }); 
  if (expenseRes.status === 401 || expenseRes.status === 403)
    return redirect("/auth");

  if (!expenseRes.ok) {
    throw new Response(JSON.stringify({ message: "Failed to load expense" }), {
      status: expenseRes.status || 500,
    });
  }

  // fetch categories for the dropdown
  const catsRes = await apiFetch("/categories", { method: "GET" });
  if (!catsRes.ok) {
    throw new Response(
      JSON.stringify({ message: "Failed to load categories" }),
      {
        status: catsRes.status || 500,
      }
    );
  }

  return {
    expense: {
      id: expenseRes.data.id,
      title: expenseRes.data.title,
      value: String(expenseRes.data.value ?? ""),
      categoryId: expenseRes.data.category?.id ?? "",
    },
    categories: (catsRes.data || []).map((c) => ({ id: c.id, name: c.name })),
  };
}

export async function action({ request, params }) {
  const { id } = params;
  const form = await request.formData();
  const payload = {
    title: form.get("title")?.trim(),
    value: String(form.get("value") ?? ""),
    categoryId: Number(form.get("categoryId")),
  };

  if (!payload.title || !payload.value || !payload.categoryId) {
    return new Response(
      JSON.stringify({ error: "Please fill all required fields." }),
      {
        status: 400,
      }
    );
  }

  const res = await apiFetch(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (res.status === 401 || res.status === 403) return redirect("/auth");
  if (!res.ok) {
    return new Response(
      JSON.stringify(res.data ?? { error: "Failed to update expense" }),
      {
        status: res.status || 500,
      }
    );
  }

  return redirect("/"); 
}

export default function EditTransaction() {
  const data = useLoaderData() ?? { expense: null, categories: [] };
  const actionData = useActionData();

  const defaults = data.expense ?? { title: "", value: "", categoryId: "" };
  const categories = data.categories ?? [];

  return (
    <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-gray-100">
      <TransactionForm
        title="Edit Transaction"
        categories={categories}
        defaultValues={defaults}
        error={actionData?.error}
        submitLabel="Update"
        cancelHref="/"
      />
    </main>
  );
}
