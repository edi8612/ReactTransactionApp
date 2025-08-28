import styles from "../Transactions/Transactions.module.css";

export default function Transaction({ transaction }) {
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
        Amount: <span className={amountClass}>${transaction.amount}</span>
      </p>
      <p className={styles.detail}>
        Date: <span className={styles.label}>{transaction.date}</span>
      </p>

      <div className={styles.actions}>
        <button className={`${styles.actionButton} ${styles.editButton}`}>
          Edit
        </button>
        <button className={`${styles.actionButton} ${styles.deleteButton}`}>
          Delete
        </button>
      </div>
    </div>
  );
}
