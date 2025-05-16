import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: '#FDFAF6' }}>
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-[#99BC85]">Products Management</h1>
        <button
          className="bg-[#97BE5A] text-white px-4 py-2 rounded-lg hover:bg-[#85ab4f] transition-colors"
          onClick={() => setShowForm(true)}
        >
          + Add Product
        </button>
      </div>

      {showForm && <AddProduct onClose={() => setShowForm(false)} />}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-4 text-center">No products found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-[#97BE5A] text-white">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Categories</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-[#FDFAF6]">
                  <td className="p-3 flex items-center">
                    {product.images?.[0]?.image && (
                      <img 
                        src={product.images[0].image} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                    )}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description?.substring(0, 30)}...</div>
                    </div>
                  </td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.quantity > 0 ? 'bg-[#99BC85]' : 'bg-[#FF8BA7]'
                    } text-white`}>
                      {product.quantity} in stock
                    </span>
                  </td>
                  <td className="p-3">
                    {product.categories?.map(cat => (
                      <span key={cat.id} className="bg-[#FDFAF6] text-[#97BE5A] px-2 py-1 rounded-full text-xs mr-1">
                        {cat.name}
                      </span>
                    ))}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-1 text-sm">(4.2)</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="text-[#97BE5A] hover:text-[#85ab4f] mr-2">Edit</button>
                    <button className="text-[#FF8BA7] hover:text-[#e67a92]">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#97BE5A] text-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Total Products</h3>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-[#99BC85] text-white p-4 rounded-lg shadow">
          <h3 className="font-bold">In Stock</h3>
          <p className="text-2xl">{products.filter(p => p.quantity > 0).length}</p>
        </div>
        <div className="bg-[#FF8BA7] text-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Out of Stock</h3>
          <p className="text-2xl">{products.filter(p => p.quantity <= 0).length}</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
