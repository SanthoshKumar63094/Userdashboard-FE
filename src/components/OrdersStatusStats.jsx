export default function OrdersStatusStats({ orders = [] }) {
  const total = orders.length || 1;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const onTheWay = orders.filter(o => o.status === 'On the way').length;
  const packing = orders.filter(o => o.status === 'Packing').length;
  const paymentIssue = orders.filter(o => o.payment === 'Pending' || o.payment === 'Error').length;

  const items = [
    { key: 'delivered', title: 'Delivered', value: delivered, color: 'bg-green-500', bar: 'bg-green-200' },
    { key: 'on_the_way', title: 'On the way', value: onTheWay, color: 'bg-indigo-500', bar: 'bg-indigo-200' },
    { key: 'payment_issue', title: 'Payment Issue', value: paymentIssue, color: 'bg-red-500', bar: 'bg-red-200' },
    { key: 'packing', title: 'Packing', value: packing, color: 'bg-amber-500', bar: 'bg-amber-200' },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Activity Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => {
          const pct = Math.min(100, Math.round((it.value / total) * 100));
          return (
            <div key={it.key} className="bg-white rounded-xl shadow p-5">
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">{it.title}</div>
                <div className="text-gray-500 text-sm mb-4">{it.value} Orders</div>
                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${it.bar}`} style={{ width: pct + '%' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
