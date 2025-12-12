import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductImage, deleteProductImage } from '../../../actions/productActions';
import { Button } from '@/components/ui/button';

/**
 * Simple image manager: show current images from productDetails in store and allow upload/delete.
 * Expects slug prop.
 */
const ProductImageManager = ({ slug }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((s) => s.productDetails || {});
  const images = productDetails.product?.images || [];
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Select an image');
    await dispatch(addProductImage(slug, { image: file, alt_text: alt }));
    setFile(null);
    setAlt('');
  };

  const onDelete = async (id) => {
    if (!confirm('Delete image?')) return;
    await dispatch(deleteProductImage(slug, id));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {images.length === 0 && <div className="col-span-3 text-sm text-gray-500">No images</div>}
        {images.map((img) => (
          <div key={img.id || img.url} className="border rounded p-2">
            <img src={img.url} alt={img.alt_text || ''} className="w-full h-28 object-cover mb-2 rounded" />
            <div className="flex justify-between items-center">
              <div className="text-xs">{img.alt_text}</div>
              <button onClick={() => onDelete(img.id)} className="text-red-600 text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="flex gap-2 items-center">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt text" className="border px-2 py-1 rounded" />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
};

export default ProductImageManager;