

const items = [
  { key: "dashboard", label: "Dashboard", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z"/>
    </svg>
  )},
  { key: "products", label: "Products", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M21 10l-9 4-9-4"/><path d="M12 14v7"/>
    </svg>
  )},
  { key: "customers", label: "Customers", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )},
  { key: "orders", label: "Order List", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>
    </svg>
  )},
  { key: "reports", label: "Reports", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3h18v18H3z"/><path d="M7 15l3-3 3 3 4-4"/>
    </svg>
  )},
  { key: "logout", label: "Logout", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>
    </svg>
  )},
];

export default function Sidebar({ open, onClose, active, setActive, onLogout }) {

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-16 flex items-center gap-2 px-5">
          <div className="h-8 w-8 grid place-items-center rounded-md bg-indigo-600 text-white">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4-8 4-8-4 8-4z"/><path d="M4 11l8 4 8-4"/><path d="M4 17l8 4 8-4"/></svg>
          </div>
          <span className="font-semibold">Sk Dashboard </span>
        </div>

        <nav className="p-3">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = active === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => item.key === "logout" ? onLogout() : setActive(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
