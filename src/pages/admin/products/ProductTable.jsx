import React from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Simple table for admin listing.
 * products is expected to be array or object with results[] depending on API.
 */
const ProductTable = ({ products = [], loading, error, onEdit, onView, onRefresh }) => {
  const items = Array.isArray(products) ? products : products?.results || [];

  return (
    <div className="bg-white border border-gray-100 rounded shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium hidden sm:table-cell">SKU</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {loading && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">Loading...</td>
            </tr>
          )}

          {!loading && items.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">
                No products found
                <div className="mt-2">
                  <Button variant="link" onClick={onRefresh}>Refresh</Button>
                </div>
              </td>
            </tr>
          )}

          {items.map((p) => (
            <tr key={p.id || p.slug}>
              <td className="px-4 py-3 text-sm font-medium">{p.title}</td>
              <td className="px-4 py-3 text-sm hidden sm:table-cell">{p.sku || '-'}</td>
              <td className="px-4 py-3 text-sm">{p.price != null ? `KSh ${p.price}` : '-'}</td>
              <td className="px-4 py-3 text-sm">{p.in_stock ? 'In stock' : 'Out'}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onView(p.slug || p.id)} title="View">
                    <Eye size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onEdit(p)} title="Edit">
                    <Pencil size={16} />
                  </Button>
                  <DeleteButton product={p} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DeleteButton = ({ product }) => {
  const handleDelete = async () => {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    try {
      // lightweight direct API call (use your apiClient)
      const apiClient = (await import('../../../api/apiClient')).default;
      await apiClient.delete(`/products/${product.slug || product.id}/`);
      alert('Deleted');
      window.location.reload(); // simple refresh to reflect deletion
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <button onClick={handleDelete} title="Delete" className="p-1 hover:bg-red-50 rounded">
      <Trash2 size={16} className="text-red-600" />
    </button>
  );
};

export default ProductTable;