import { Link, Form } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Transactions.module.css";

function fmtMoney(n) {
  const num = Number(n) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}

export default function Transaction({ transaction }) {
  const { isAuthed, loading } = useAuth();

  const amountClass =
    transaction.amount >= 0
      ? `${styles.amount} ${styles.amountPositive}`
      : `${styles.amount} ${styles.amountNegative}`;

  return (
    <div className={styles.transactionCard}>
      <h3 className={styles.title}>{transaction.title}</h3>

      <p className={styles.detail}>
        Category: <span className={styles.label}>{transaction.category}</span>
      </p>
      <p className={styles.detail}>
        Amount:{" "}
        <span className={amountClass}>{fmtMoney(transaction.amount)}</span>
      </p>
      <p className={styles.detail}>
        Date: <span className={styles.label}>{transaction.date}</span>
      </p>

      {!loading && isAuthed && (
        <div className={styles.actions}>
          <Link
            to={`/transactions/${transaction.id}/edit`}
            className={`${styles.actionButton} ${styles.editButton}`}
          >
            Edit
          </Link>
          <Form
            method="post"
            action={`/transactions/${transaction.id}/delete`}
            onSubmit={(e) => {
              if (
                !confirm("Are you sure you want to delete this transaction?")
              ) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className={`${styles.actionButton} ${styles.deleteButton}`}
            >
              Delete
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}
