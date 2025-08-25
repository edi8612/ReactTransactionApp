export default function Transaction({ transaction }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <h3 className="font-semibold text-lg text-gray-800">{transaction.title}</h3>
      <p className="text-sm text-gray-600">Category: <span className="font-medium">{transaction.category}</span></p>
      <p className="text-sm text-gray-600">Amount: <span className="font-bold">${transaction.amount}</span></p>
      <p className="text-sm text-gray-600">Date: <span className="font-medium">{transaction.date}</span></p>

      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
          Edit
        </button>
        <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  )
}