import { Form, useNavigation } from "react-router-dom";
import styles from "./TransactionForm.module.css";

export default function TransactionForm({
  title = "Create New Transaction",
  categories = [],
  defaultValues = { title: "", value: "", categoryId: "" },
  error,
  submitLabel = "Save",
  cancelHref = "/",
}) {
  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>{title}</h1>
      {error && <div className={styles.error}>{error}</div>}

      <Form method="post" replace>
        <div className={styles.field}>
          <label className={styles.label}>Title *</label>
          <input
            name="title"
            type="text"
            required
            className={styles.input}
            defaultValue={defaultValues.title}
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
            required
            className={styles.input}
            defaultValue={defaultValues.value}
            placeholder="e.g. 10.50"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category *</label>
          <select
            name="categoryId"
            required
            className={styles.select}
            defaultValue={defaultValues.categoryId}
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
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
          <a href={cancelHref} className={styles.cancelLink}>
            Cancel
          </a>
        </div>
      </Form>
    </div>
  );
}
