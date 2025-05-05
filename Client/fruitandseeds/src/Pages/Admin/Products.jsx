import React, { useState } from "react";
import AddProduct from "./AddProduct";

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">إدارة المنتجات</h1>
        <button
          className="bg-[#97BE5A] text-white px-4 py-2 rounded-lg hover:bg-[#85ab4f]"
          onClick={() => setShowForm(true)}
        >
          + إضافة منتج
        </button>
      </div>

      {/* هون رح نعرض المودال */}
      {showForm && <AddProduct onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Products;
