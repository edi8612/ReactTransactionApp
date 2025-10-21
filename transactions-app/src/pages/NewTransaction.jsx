import { useLoaderData } from "react-router-dom";
import { apiFetch } from "../lib/api";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import { API } from "../lib/endpoints.js";


export async function loader() {
  const res = await apiFetch(API.categories, { method: "GET" });
  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Failed to load categories" }),
      {
        status: res.status || 500,
      }
    );
  }
  const categories = (res.data || []).map((c) => ({ id: c.id, name: c.name }));
  return categories;
}

export default function NewTransaction() {
  const categories = useLoaderData() ?? [];

  const handleSave = async (formData) => {
    

    
    if (!formData.title?.trim()) {
      return {
        success: false,
        error: "Title is required",
      };
    }
    if (!formData.value) {
      return {
        success: false,
        error: "Amount is required",
      };
    }
    if (!formData.categoryId) {
      return {
        success: false,
        error: "Category is required",
      };
    }

    try {
      const res = await apiFetch(API.tx.create, {
        method: "POST",
        body: JSON.stringify({
          title: formData.title.trim(),
          value: parseFloat(formData.value),
          categoryId: formData.categoryId,
        }),
      });

      if (res.status === 401 || res.status === 403) {
        
        return {
          success: false,
          error: "You must be logged in to create transactions",
        };
      }

      if (res.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: res.data?.message || "Failed to create transaction",
        };
      }
    } catch (error) {
      console.error("Error creating transaction:", error); 
      return {
        success: false,
        error: error.message || "Network error occurred",
      };
    }
  };

  return (
    <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-gray-100">
      <TransactionForm
        title="Create New Transaction"
        categories={categories}
        defaultValues={{
          title: "",
          value: "",
          categoryId: "",
        }}
        onSave={handleSave}
        cancelHref="/"
      />
    </main>
  );
}