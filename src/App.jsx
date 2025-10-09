import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import RevenueChart from "./components/RevenueChart";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import CustomersStats from "./components/CustomersStats";
import CustomersTable from "./components/CustomersTable";
import SalesByDistrict from "./components/SalesReport";
import OrdersStatusStats from "./components/OrdersStatusStats";
import SalesByProduct from "./components/SalesByProduct";
import "./index.css";

// 🔹 Loader Component
function Loader({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-600">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p>{message || "Loading data..."}</p>
    </div>
  );
}

// 🔹 No Data Component
function NoData({ message }) {
  return (
    <div className="p-6 text-center text-gray-600 bg-white rounded-lg shadow">
      {message || "No data available"}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true); // 🆕
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [districtSales, setDistrictSales] = useState([]);
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    const API = "https://userdashboard-be.onrender.com"
;
    async function loadAll() {
      try {
        const [s, p, c, o, ds, pf] = await Promise.all([
          fetch(`${API}/api/summary`).then(r => r.json()),
          fetch(`${API}/api/products`).then(r => r.json()),
          fetch(`${API}/api/customers`).then(r => r.json()),
          fetch(`${API}/api/orders`).then(r => r.json()),
          fetch(`${API}/api/district-sales`).then(r => r.json()),
          fetch(`${API}/api/profits`).then(r => r.json()),
        ]);
        setData(s);
        setProducts(p);
        setCustomers(c);
        setOrders(o);
        setDistrictSales(ds);
        setProfits(pf);
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setLoading(false); // 🆕 end loading
      }
    }
    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={active}
        setActive={(key) => {
          setActive(key);
          setSidebarOpen(false);
        }}
        onLogout={() => {
          setLogoutDialogOpen(true);
          setSidebarOpen(false);
        }}
      />

      <div className="md:ml-64">
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {active.replace("-", " ")}
          </h2>

          {/* 🌀 Global Loading State */}
          {loading ? (
            <Loader message={`Loading ${active} data...`} />
          ) : (
            <>
              {/* Dashboard Section */}
              {active === "dashboard" && (
                <>
                  {data && data.sales ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card title="Sales (Today)" value={`₹${data.sales.today}`} />
                      <Card title="Sales (Yesterday)" value={`₹${data.sales.yesterday}`} />
                      <Card title="Sales (Monthly)" value={`₹${data.sales.monthly}`} />
                      <Card title="Sales (Yearly)" value={`₹${data.sales.yearly}`} />
                    </div>
                  ) : (
                    <NoData message="No sales data available" />
                  )}

                  <div className="mt-6">
                    {data ? (
                      <RevenueChart data={data} />
                    ) : (
                      <NoData message="No revenue data available" />
                    )}
                  </div>

                  {data ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                      <Card title="Total Orders" value={data.orders} />
                      <Card title="Active Customers" value={data.customers} />
                      <Card title="Low Stock Alerts" value={data.lowStockCount} />
                    </div>
                  ) : (
                    <NoData message="No order/customer data available" />
                  )}
                </>
              )}

              {/* Products Section */}
              {active === "products" && (
                products && products.length > 0 ? (
                  <ProductsTable
                    products={products}
                    onEdit={(p) => {
                      const name = window.prompt("Product name", p.name) ?? p.name;
                      const category = window.prompt("Category", p.category) ?? p.category;
                      const stockStr = window.prompt("Stock", String(p.stock));
                      const priceStr = window.prompt("Price (₹)", String(p.price));
                      const stock = stockStr === null ? p.stock : Math.max(0, Number(stockStr));
                      const price = priceStr === null ? p.price : Math.max(0, Number(priceStr));
                      setProducts((list) =>
                        list.map((it) =>
                          it.id === p.id ? { ...it, name, category, stock, price } : it
                        )
                      );
                    }}
                    onDelete={(p) => {
                      if (window.confirm(`Delete ${p.name}?`)) {
                        setProducts((list) => list.filter((it) => it.id !== p.id));
                      }
                    }}
                  />
                ) : (
                  <NoData message="No products available" />
                )
              )}

              {/* Other sections remain same... */}
            </>
          )}
        </main>
      </div>

      {logoutDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
