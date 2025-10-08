export default function ProductsTable({ products = [], onEdit, onDelete }) {
  const handleEdit = (p) => onEdit ? onEdit(p) : alert(`Edit: ${p.name}`);
  const handleDelete = (p) => onDelete ? onDelete(p) : alert(`Delete: ${p.name}`);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Products</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover bg-gray-100"/>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      {p.subtitle && <div className="text-gray-500 text-xs">{p.subtitle}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${p.stock <= 2 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">₹{p.price}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded border text-blue-600 border-blue-200 hover:bg-blue-50">Edit</button>
                    <button onClick={() => handleDelete(p)} className="px-2 py-1 rounded border text-red-600 border-red-200 hover:bg-red-50">Delete</button>
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
