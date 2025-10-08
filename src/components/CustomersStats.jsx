export default function CustomersStats({ stats }) {
  const items = [
    { key: 'total', label: 'Total Customers', value: stats.total, icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
    )},
    { key: 'new', label: 'New Customers', value: stats.new, icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
    )},
    { key: 'active', label: 'Active Customers', value: stats.active, icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
    )},
    { key: 'blocked', label: 'Blocked Customers', value: stats.blocked, icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 8l8 8M16 8l-8 8"/></svg>
    )},
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.key} className="flex items-center justify-between border rounded-lg px-4 py-3">
            <div>
              <div className="text-2xl font-semibold">{it.value.toLocaleString()}</div>
              <div className="text-gray-500 text-sm">{it.label}</div>
            </div>
            <div className="h-10 w-10 grid place-items-center rounded-md bg-gray-100 text-gray-700">
              {it.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
