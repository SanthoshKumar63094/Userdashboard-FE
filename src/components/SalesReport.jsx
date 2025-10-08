import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, AreaChart, Area, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function SalesByDistrict({ data, ordersTrend, profits }) {
  const fallbackOrders = [
    { month: 'Jan', orders: 1200 },
    { month: 'Feb', orders: 1500 },
    { month: 'Mar', orders: 900 },
    { month: 'Apr', orders: 1300 },
    { month: 'May', orders: 1400 },
    { month: 'Jun', orders: 1100 },
    { month: 'Jul', orders: 1250 },
    { month: 'Aug', orders: 1700 },
    { month: 'Sep', orders: 1800 },
    { month: 'Oct', orders: 1150 },
    { month: 'Nov', orders: 1450 },
    { month: 'Dec', orders: 300 },
  ];

  const trend = ordersTrend && ordersTrend.length ? ordersTrend : fallbackOrders;

  const profitsFallback = [
    { name: '2022', value: 38 },
    { name: '2023', value: 62 },
  ];
  const profitData = profits && profits.length ? profits : profitsFallback;
  const profitColors = ['#0b1b3a', '#10bfa8'];
  const [selectedProfit, setSelectedProfit] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sales by District */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-1">
          <h3 className="text-lg font-semibold">Sales by District</h3>
          <p className="text-xs text-gray-500">until your daily purchase target</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
              <CartesianGrid strokeDasharray="4 6" stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={(v) => `${v/1000 >= 1 ? v/1000 + 'K' : v}`}/>
              <YAxis type="category" dataKey="district" width={64}/>
              <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="#c7d2fe">
                <LabelList dataKey="value" position="insideRight" formatter={(v) => v.toLocaleString()} className="fill-blue-600" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Order */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-1">
          <h3 className="text-lg font-semibold">Recent Order</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="orderFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tickMargin={8} />
              <YAxis width={40} tickFormatter={(v) => v} />
              <Tooltip cursor={{ stroke: '#bfdbfe' }} contentStyle={{ borderRadius: 8 }} />
              <Area type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={4} fill="url(#orderFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Profit Performance */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Profit Performance</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={profitData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                stroke="#fff"
                strokeWidth={4}
                onClick={(_, idx) => setSelectedProfit(profitData[idx])}
              >
                {profitData.map((entry, idx) => (
                  <Cell key={`slice-${idx}`} fill={profitColors[idx % profitColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, `Profit ${n}`]} wrapperStyle={{ borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {selectedProfit && (
          <div className="flex justify-center mb-2">
            <div className="px-3 py-1 rounded shadow bg-white text-sm">
              Profit {selectedProfit.name}: {selectedProfit.value >= 1000 ? `${(selectedProfit.value/1000).toFixed(1)}k` : selectedProfit.value}
            </div>
          </div>
        )}
        <div className="flex items-center gap-6 justify-center mt-2 text-sm">
          {profitData.map((p, i) => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: profitColors[i % profitColors.length] }} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
