import { JSX } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Transactions.module.css";
import { TransactionProps } from "./Transactions.types";
//@ts-ignore
import {apiFetch} from "../../lib/api";
//@ts-ignore
import {API} from "../../lib/endpoints";

function fmtMoney(n: number | string): string {
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

export default function Transaction({
  transaction,
}: TransactionProps): JSX.Element {
  const { isAuthed } = useAuth();

  const amountClass =
    Number(transaction.amount) >= 0
      ? `${styles.amount} ${styles.amountPositive}`
      : `${styles.amount} ${styles.amountNegative}`;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const res = await apiFetch(API.tx.delete(transaction.id), {
        method: "DELETE",
      });

      if (res.ok) {

        window.location.reload();
        // navigate("/", { replace: true });
      } else {
        alert(res.data?.message || "Failed to delete transaction");
      }
    } catch (error) {
      alert("An error occurred while deleting the transaction");
      console.error("Delete error:", error);
    }
  };

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

      { isAuthed && (
        <div className={styles.actions}>
          <Link
            to={`/transactions/${transaction.id}/edit`}
            className={`${styles.actionButton} ${styles.editButton}`}
          >
            Edit
          </Link>
          
            <button
              type="submit"
              onClick={handleDelete}
              className={`${styles.actionButton} ${styles.deleteButton}`}
            >
              Delete
            </button>
         
        </div>
      )}
    </div>
  );
}
