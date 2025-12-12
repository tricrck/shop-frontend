import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories, listBrands } from '../../../actions/productActions';
import apiClient from '../../../api/apiClient';

/**
 * Modal used for both create and edit.
 * initialProduct can be null (create) or existing product (edit).
 */
const ProductFormModal = ({ open, onClose, initialProduct, onSaved }) => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((s) => s.categoryList || {});
  const { brands = [] } = useSelector((s) => s.brandList || {});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    sku: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    in_stock: true,
    on_sale: false,
    is_featured: false,
  });

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listBrands());
  }, [dispatch]);

  useEffect(() => {
    if (initialProduct) {
      setForm({
        title: initialProduct.title || '',
        sku: initialProduct.sku || '',
        price: initialProduct.price ?? '',
        description: initialProduct.description || '',
        category: initialProduct.category || '',
        brand: initialProduct.brand || '',
        in_stock: !!initialProduct.in_stock,
        on_sale: !!initialProduct.on_sale,
        is_featured: !!initialProduct.is_featured,
      });
    } else {
      setForm((f) => ({ ...f, title: '', sku: '', price: '', description: '' }));
    }
  }, [initialProduct, open]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (initialProduct) {
        // update
        await apiClient.put(`/products/${initialProduct.slug || initialProduct.id}/`, form);
      } else {
        // create
        await apiClient.post('/products/', form);
      }
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialProduct ? 'Edit product' : 'Create product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Title" required />
            <Input value={form.sku} onChange={(e) => update('sku', e.target.value)} placeholder="SKU" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="Price" />
            <select value={form.category} onChange={(e) => update('category', e.target.value)} className="border rounded px-3 py-2">
              <option value="">Category (optional)</option>
              {categories?.results?.map((c) => <option value={c.slug || c.id} key={c.slug || c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <select value={form.brand} onChange={(e) => update('brand', e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="">Brand (optional)</option>
              {brands?.results?.map((b) => <option value={b.slug || b.id} key={b.slug || b.id}>{b.name}</option>)}
            </select>
          </div>

          <div>
            <Textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Description" rows={5} />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Checkbox checked={form.in_stock} onCheckedChange={(v) => update('in_stock', !!v)} />
              <span className="text-sm">In stock</span>
            </label>

            <label className="flex items-center gap-2">
              <Checkbox checked={form.on_sale} onCheckedChange={(v) => update('on_sale', !!v)} />
              <span className="text-sm">On sale</span>
            </label>

            <label className="flex items-center gap-2">
              <Checkbox checked={form.is_featured} onCheckedChange={(v) => update('is_featured', !!v)} />
              <span className="text-sm">Featured</span>
            </label>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;