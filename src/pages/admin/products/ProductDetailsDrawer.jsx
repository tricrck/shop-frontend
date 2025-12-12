import React, { useEffect } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, resetProductDetails } from '../../../actions/productActions';
import ProductImageManager from './ProductImageManager';
import { Button } from '@/components/ui/button';

/**
 * Drawer style details panel. Accepts slug; if null -> closed.
 * Uses Redux productDetails.
 */
const ProductDetailsDrawer = ({ slug, onClose }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((s) => s.productDetails || {});
  const { loading, product, error } = productDetails;

  useEffect(() => {
    if (slug) {
      dispatch(getProductDetails(slug));
    } else {
      dispatch(resetProductDetails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Drawer open={!!slug} onOpenChange={(v) => { if (!v) onClose(); }}>
      <div className="w-full max-w-2xl p-6 bg-white text-black">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold">{product?.title || (loading ? 'Loading...' : 'Product')}</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {product && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">SKU: {product.sku || '-'}</p>
              <p className="text-sm text-gray-600">Price: KSh {product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.in_stock ? 'In stock' : 'Out'}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <div className="prose max-w-none text-black">
                {product.description || <em>No description</em>}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Images</h3>
              <ProductImageManager slug={product.slug || product.id} />
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default ProductDetailsDrawer;