import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./TransactionForm.module.css";

export default function TransactionForm({
  title = "Edit Transaction",
  categories = [],
  defaultValues = { title: "", value: "", categoryId: "" },
  onSave, 
  cancelHref = "/",
}) {
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    title: defaultValues.title || "",
    value: defaultValues.value || "",
    categoryId: defaultValues.categoryId || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSave = async () => {
    
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.value) {
      setError("Amount is required");
      return;
    }
    if (!formData.categoryId) {
      setError("Category is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onSave(formData);
      
      if (result.success) {
        navigate(cancelHref);
      } else {
        setError(result.error || "Failed to save transaction");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(cancelHref);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>{title}</h1>
      {error && <div className={styles.error}>{error}</div>}

      <div>
        <div className={styles.field}>
          <label className={styles.label}>Title *</label>
          <input
            name="title"
            type="text"
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. PC"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Amount *</label>
          <input
            name="value"
            type="number"
            step="0.01"
            inputMode="decimal"
            className={styles.input}
            value={formData.value}
            onChange={handleChange}
            placeholder="e.g. 10.50"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category *</label>
          <select
            name="categoryId"
            className={styles.select}
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelLink}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}