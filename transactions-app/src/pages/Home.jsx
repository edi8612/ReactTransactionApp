import Transaction from "../components/Transactions/Transactions.jsx";
import { transactions } from "../transactions.js";

export default function Home() {
  return (
    <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-gray-100">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </main>
  );
}
