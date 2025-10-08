import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// days order matches the mock in the screenshot
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toWeeklySeries(data) {
  // Try to read from provided dashboard data; fall back to a pleasant demo curve.
  const thisWeek = data?.revenue?.thisWeek ?? [800, 1200, 900, 1800, 2400, 2900, 1600];
  const lastWeek = data?.revenue?.lastWeek ?? [500, 1600, 1400, 1200, 2600, 2100, 2200];
  return days.map((d, i) => ({ day: d, thisWeek: thisWeek[i], lastWeek: lastWeek[i] }));
}

export default function RevenueChart({ data }) {
  const chartData = toWeeklySeries(data);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Revenue</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} tickMargin={8} />
            <YAxis tickFormatter={(v) => `$${v/1000 >= 1 ? v/1000 + 'k' : v}`} width={48} />
            <Legend verticalAlign="top" height={24} wrapperStyle={{ paddingBottom: 8 }} />
            <Line type="monotone" dataKey="thisWeek" name="This Week" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="lastWeek" name="Last Week" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
