import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";

function buildData(orders = []) {
  const map = new Map();
  orders.forEach(o => {
    const key = o.name || 'Unknown';
    map.set(key, (map.get(key) || 0) + (Number(o.qty) || 0));
  });
  const arr = Array.from(map.entries()).map(([product, qty]) => ({ product, qty }));
  // sort desc by qty and keep top 8 for readability
  return arr.sort((a,b) => b.qty - a.qty).slice(0, 8);
}

export default function SalesByProduct({ orders = [] }) {
  const data = buildData(orders);
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-1">
        <h3 className="text-lg font-semibold">Sales by Products</h3>
        <p className="text-xs text-gray-500">Top products by quantity</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="4 6" stroke="#e5e7eb" />
            <XAxis type="number" dataKey="qty" tickMargin={6} />
            <YAxis type="category" dataKey="product" width={140} />
            <Bar dataKey="qty" radius={[8, 8, 8, 8]} fill="#93c5fd">
              <LabelList dataKey="qty" position="insideRight" className="fill-blue-800 text-xs" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
