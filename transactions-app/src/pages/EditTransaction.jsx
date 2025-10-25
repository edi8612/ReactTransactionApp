import { useLoaderData } from "react-router-dom";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import { apiFetch } from "../lib/api";
import { API } from "../lib/endpoints";


export async function loader({ params }) {
  
  
  const transactionRes = await apiFetch(
    API.tx.one(params.id), 
    { method: "GET" }
  );
  
  
  if (!transactionRes.ok) {
    throw new Response("Transaction not found", { status: 404 });
  }
  
  const categoriesRes = await apiFetch(API.categories, { method: "GET" });
  
  return {
    transactionId: params.id, 
    transaction: transactionRes.data,
    categories: categoriesRes.ok ? categoriesRes.data : [],
  };
}

export default function EditTransaction() {
  const { transactionId, transaction, categories } = useLoaderData();
  
  const handleSave = async (formData) => {
    
    
    try {
      const res = await apiFetch(
        API.tx.update(transactionId), 
        {
          method: "PUT",
          body: JSON.stringify({
            title: formData.title,
            value: parseFloat(formData.value),
            categoryId: formData.categoryId,
          }),
        }
      );

      console.log("Update response:", res); 

      if (res.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: res.data?.message || "Failed to update transaction",
        };
      }
    } catch (error) {
      console.error("Error updating transaction:", error); 
      return {
        success: false,
        error: error.message || "Network error occurred",
      };
    }
  };

  return (
    <TransactionForm
      title="Edit Transaction"
      categories={categories}
      defaultValues={{
        title: transaction.title,
        value: transaction.amount || transaction.value,
        categoryId: transaction.categoryId,
      }}
      onSave={handleSave}
      cancelHref="/"
    />
  );
}