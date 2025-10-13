import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
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
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
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

// Dashboard Component
function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [districtSales, setDistrictSales] = useState([]);

  useEffect(() => {
    const API = "http://localhost:5000";
    const token = localStorage.getItem("token");

    async function loadAll() {
      try {
        const [s, p, c, o, ds] = await Promise.all([
          axios.get(`${API}/api/summary`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/products`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/customers`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/orders`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/district-sales`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setData(s.data);
        setProducts(p.data);
        setCustomers(c.data);
        setOrders(o.data);
        setDistrictSales(ds.data);
      } catch (e) {
        console.error("Failed to load data", e);
        if (e.response?.status === 401 || e.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [navigate]);

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
          localStorage.removeItem("token");
          navigate("/login");
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

              {/* Customers Section */}
              {active === "customers" && (
                customers && customers.length > 0 ? (
                  <CustomersTable
                    customers={customers}
                    onEdit={(c) => {
                      const name = window.prompt("Customer name", c.name) ?? c.name;
                      const email = window.prompt("Email", c.email ?? "") ?? (c.email ?? "");
                      setCustomers((list) =>
                        list.map((it) =>
                          it.id === c.id ? { ...it, name, email } : it
                        )
                      );
                    }}
                    onDelete={(c) => {
                      if (window.confirm(`Delete ${c.name}?`)) {
                        setCustomers((list) => list.filter((it) => it.id !== c.id));
                      }
                    }}
                    onSetActive={(c) => {
                      setCustomers((list) =>
                        list.map((it) =>
                          it.id === c.id ? { ...it, status: 'active' } : it
                        )
                      );
                    }}
                    onSetBlocked={(c) => {
                      setCustomers((list) =>
                        list.map((it) =>
                          it.id === c.id ? { ...it, status: 'blocked' } : it
                        )
                      );
                    }}
                  />
                ) : (
                  <NoData message="No customers available" />
                )
              )}

              {/* Orders Section */}
              {active === "orders" && (
                orders && orders.length > 0 ? (
                  <OrdersTable
                    orders={orders}
                    onEdit={(o) => {
                      const status = window.prompt("Order status", o.status ?? "pending") ?? (o.status ?? "pending");
                      const amountStr = window.prompt("Order amount (₹)", String(o.amount ?? 0));
                      const amount = amountStr === null ? (o.amount ?? 0) : Math.max(0, Number(amountStr));
                      setOrders((list) =>
                        list.map((it) =>
                          it.id === o.id ? { ...it, status, amount } : it
                        )
                      );
                    }}
                    onDelete={(o) => {
                      if (window.confirm(`Delete order #${o.id}?`)) {
                        setOrders((list) => list.filter((it) => it.id !== o.id));
                      }
                    }}
                    onCancel={(o) => {
                      if (window.confirm(`Cancel order #${o.id}?`)) {
                        setOrders((list) =>
                          list.map((it) =>
                            it.id === o.id ? { ...it, status: 'Order Cancelled by User' } : it
                          )
                        );
                      }
                    }}
                  />
                ) : (
                  <NoData message="No orders available" />
                )
              )}

              {/* Reports Section */}
              {active === "reports" && (
                <div className="space-y-6">
                  {/* Duplicate Dashboard Sales Cards */}
                  {data && data.sales ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card title="Sales (Today)" value={`₹${data.sales.today}`} />
                        <Card title="Sales (Yesterday)" value={`₹${data.sales.yesterday}`} />
                        <Card title="Sales (Monthly)" value={`₹${data.sales.monthly}`} />
                        <Card title="Sales (Yearly)" value={`₹${data.sales.yearly}`} />
                      </div>
                    </div>
                  ) : (
                    <NoData message="No sales data available" />
                  )}

                  {/* Duplicate Dashboard Revenue Chart */}
                  {data ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Revenue Chart</h3>
                      <RevenueChart data={data} />
                    </div>
                  ) : (
                    <NoData message="No revenue data available" />
                  )}

                  {/* Duplicate Dashboard Stats Cards */}
                  {data ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Card title="Total Orders" value={data.orders} />
                        <Card title="Active Customers" value={data.customers} />
                        <Card title="Low Stock Alerts" value={data.lowStockCount} />
                      </div>
                    </div>
                  ) : (
                    <NoData message="No metrics data available" />
                  )}

                  {/* Reports-Specific Components */}
                  {districtSales && districtSales.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Sales by District</h3>
                      <SalesByDistrict data={districtSales} />
                    </div>
                  ) : (
                    <NoData message="No district sales data available" />
                  )}

                  {orders && orders.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Order Status Stats</h3>
                      <OrdersStatusStats orders={orders} />
                    </div>
                  ) : (
                    <NoData message="No orders for status stats" />
                  )}

                  {orders && orders.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Sales by Product</h3>
                      <SalesByProduct orders={orders} />
                    </div>
                  ) : (
                    <NoData message="No orders for product sales" />
                  )}
                </div>
              )}

              {/* Other sections remain same... */}
            </>
          )}
        </main>
      </div>

    </div>
  );
}

// App Component with Routing
function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
