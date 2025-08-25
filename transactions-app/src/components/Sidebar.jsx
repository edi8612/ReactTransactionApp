export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-16 left-0 w-64 h-full bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <nav className="p-4 space-y-4">
          <a href="#home" className="block p-2 hover:bg-gray-700 rounded">Home</a>
          <a href="#create" className="block p-2 hover:bg-gray-700 rounded">Create New Transaction</a>
          <a href="#auth" className="block p-2 hover:bg-gray-700 rounded">Login/Signup</a>
        </nav>
      </aside>
    </>
  )
}