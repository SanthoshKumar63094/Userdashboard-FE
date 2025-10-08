export default function CustomersTable({ customers = [], onSetActive, onSetBlocked }) {
  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Customers</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Customer Name</th>
              <th className="text-left px-4 py-3">Customer ID</th>
              <th className="text-left px-4 py-3">Total Orders</th>
              <th className="text-left px-4 py-3">Total Spent</th>
              <th className="text-left px-4 py-3">District</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 grid place-items-center text-gray-600 font-medium">
                      {c.avatar || c.name?.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      {c.email && <div className="text-xs text-gray-500">{c.email}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{c.customerId}</td>
                <td className="px-4 py-3">{c.totalOrders}</td>
                <td className="px-4 py-3 font-semibold">₹{Number(c.totalSpent).toLocaleString()}</td>
                <td className="px-4 py-3">{c.district}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSetActive && onSetActive(c)}
                      disabled={c.status === 'active'}
                      className="px-3 py-1 rounded border text-green-700 border-green-200 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Active User
                    </button>
                    <button
                      onClick={() => onSetBlocked && onSetBlocked(c)}
                      disabled={c.status === 'blocked'}
                      className="px-3 py-1 rounded border text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Block User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
