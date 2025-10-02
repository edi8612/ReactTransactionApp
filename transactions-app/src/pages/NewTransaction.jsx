import { useLoaderData, useActionData, redirect,  } from "react-router-dom";
import { apiFetch } from "../lib/api";
import TransactionForm from "../components/TransactionForm/TransactionForm.jsx";

// Loader: fetch categories for the dropdown
export async function loader() {
  const res = await apiFetch("/categories", { method: "GET" });
  if (!res.ok) {
  throw new Response(JSON.stringify({ message: "Failed to load categories" }), {
    status: res.status || 500,
  });
}
  const categories = (res.data || []).map((c) => ({ id: c.id, name: c.name }));
  return categories;
}

export async function action({ request }) {
  const form = await request.formData();
  const payload = {
    title: form.get("title")?.trim(),
    value: String(form.get("value") ?? ""),        
    categoryId: Number(form.get("categoryId")),    
  };

  if (!payload.title || !payload.value || !payload.categoryId) {
    return json({ error: "Please fill all required fields." }, { status: 400 });
  }

  const res = await apiFetch("/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.status === 401 || res.status === 403) {
    return redirect("/auth");
  }
if (!payload.title || !payload.value || !payload.categoryId) {
  return new Response(JSON.stringify({ error: "Please fill all required fields." }), {
    status: 400,
  });
}

  return redirect("/"); // Home loader will re-fetch and show the new item
}

export default function NewTransaction() {
  const categories = useLoaderData() ?? [];
  const actionData = useActionData(); // { error?: string }

  return (
    <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-gray-100">
      <TransactionForm
        categories={categories}
        error={actionData?.error}
        submitLabel="Save"
        cancelHref="/"
      />
    </main>
  );
}
