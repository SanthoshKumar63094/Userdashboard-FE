export default function OrdersTable({ orders = [], onCancel }) {
  const statusColors = {
    Delivered: 'bg-green-50 text-green-700',
    'On the way': 'bg-indigo-50 text-indigo-700',
    Packing: 'bg-amber-50 text-amber-700',
    Cancelled: 'bg-red-50 text-red-600',
    'Order Cancelled by User': 'bg-red-50 text-red-600',
  };

  const payColors = {
    Paid: 'bg-emerald-50 text-emerald-700',
    Error: 'bg-red-50 text-red-600',
    Pending: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Order Details</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Qty</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Payment</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Order ID</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={o.image} alt={o.name} className="h-10 w-10 rounded object-cover bg-gray-100"/>
                    <div>
                      <div className="font-medium">{o.name}</div>
                      {o.subtitle && <div className="text-gray-500 text-xs">{o.subtitle}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">₹{o.price}</td>
                <td className="px-4 py-3">{o.qty}</td>
                <td className="px-4 py-3 font-semibold">₹{(o.price * o.qty).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${payColors[o.payment] || 'bg-gray-100 text-gray-700'}`}>{o.payment}</span>
                </td>
                <td className="px-4 py-3">{o.userName || '-'}</td>
                <td className="px-4 py-3">
                  {(['Pending','Error'].includes(o.payment)) ? (
                    <span >Payment Issue</span>
                  ) : (
                    <span className="font-mono text-xs">{o.orderId || '-'}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {(() => {
                    const paymentIssue = o.payment === 'Pending' || o.payment === 'Error';
                    if (paymentIssue) {
                      return (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600`}>
                          Payment Issue
                        </span>
                      );
                    }
                    return (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || 'bg-gray-100 text-gray-700'}`}>{o.status}</span>
                    );
                  })()}
                </td>
                <td className="px-4 py-3">
                  <button
                    disabled={o.status === 'Delivered' || o.status === 'Cancelled' || o.status === 'Order Cancelled by User'}
                    onClick={() => onCancel && onCancel(o)}
                    className={`px-3 py-1 rounded border text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
