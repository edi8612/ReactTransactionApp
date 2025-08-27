export default function Sidebar({ isOpen, onClose }) {
  let classes = "block p-2 hover:bg-stone-300 rounded";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-25 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-16 left-0 w-64 h-full bg-gray-200 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <nav className="p-4 text-stone-600 font-bold space-y-4">
          <a href="#Home" className={classes}>
            Home
          </a>
          <a href="#CreateNewTransaction" className={classes}>
            Create New Transaction
          </a>
          <a href="#Login/Signup" className={classes}>
            Login/Signup
          </a>
        </nav>
      </aside>
    </>
  );
}
