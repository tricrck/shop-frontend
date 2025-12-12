import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listCategories, listBrands, setFilters, clearFilters } from '../../../actions/productActions';
import ProductTable from './ProductTable';
import ProductFormModal from './ProductFormModal';
import ProductDetailsDrawer from './ProductDetailsDrawer';
import { Plus, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, count } = useSelector((s) => s.productList || { products: [] });
  const filters = useSelector((s) => s.filters || {});
  const categoriesState = useSelector((s) => s.categoryList || { categories: [] });
  const brandsState = useSelector((s) => s.brandList || { brands: [] });

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [openDetailsSlug, setOpenDetailsSlug] = useState(null);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts({ ...filters, search, page }));
  }, [dispatch, filters, search, page]);

  const onOpenCreate = () => {
    setEditProduct(null);
    setOpenForm(true);
  };

  const onEdit = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  const onView = (slug) => {
    setOpenDetailsSlug(slug);
  };

  const onApplyFilter = (payload) => {
    dispatch(setFilters(payload));
    setPage(1);
  };

  const onClearFilters = () => {
    dispatch(clearFilters());
    setSearch('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Products — Admin</h1>
            <p className="text-sm text-gray-600 mt-1">Minimal product management panel</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
            </div>

            <Button variant="ghost" onClick={() => dispatch(listProducts({}))} className="flex items-center gap-2">
              <RefreshCw size={16} /> Refresh
            </Button>

            <Button onClick={onOpenCreate} className="flex items-center gap-2">
              <Plus size={16} /> Create
            </Button>
          </div>
        </header>

        <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Select 
                value={filters.category || "all"}
                onValueChange={(value) => onApplyFilter({ 
                    category: value === "all" ? "" : value 
                })}
                >
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {categoriesState?.categories?.results?.map((c) => (
                    <SelectItem key={c.slug || c.id} value={c.slug || c.id}>{c.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Select 
                value={filters.brand || "all"}
                onValueChange={(value) => onApplyFilter({ 
                    brand: value === "all" ? "" : value 
                })}
                >
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {brandsState.brands?.results?.map((b) => (
                    <SelectItem key={b.slug || b.id} value={b.slug || b.id}>{b.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            <Button variant="ghost" onClick={onClearFilters} className="flex items-center gap-2">
                <Filter size={16} /> Clear
            </Button>
            </div>

        <main>
          <ProductTable
            loading={loading}
            error={error}
            products={products}
            onEdit={onEdit}
            onView={onView}
            onRefresh={() => dispatch(listProducts({ ...filters, search, page }))}
          />
        </main>

        <ProductFormModal
          open={openForm}
          onClose={() => setOpenForm(false)}
          initialProduct={editProduct}
          onSaved={() => {
            setOpenForm(false);
            dispatch(listProducts({ ...filters, search, page }));
          }}
        />

        <ProductDetailsDrawer
          slug={openDetailsSlug}
          onClose={() => setOpenDetailsSlug(null)}
        />
      </div>
    </div>
  );
};

export default AdminProductsPage;
