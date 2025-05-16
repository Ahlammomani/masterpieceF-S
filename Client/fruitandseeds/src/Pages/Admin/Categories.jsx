import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    fetchCategories();
  };

  const updateCategory = async (id) => {
    await axios.put(`http://localhost:5000/api/categories/${id}`, { name: editName });
    setEditId(null);
    setEditName("");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-[#FDFAF6] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#97BE5A]">Categories</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map(category => (
          <div key={category.id} className="bg-[#99BC85] text-white p-4 rounded-lg shadow flex justify-between items-center">
            {editId === category.id ? (
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="text-black p-1 rounded"
              />
            ) : (
              <div>
                <h3 className="text-lg font-bold">{category.name}</h3>
                {/* <p>{category.productCount || 0} Products</p> */}
              </div>
            )}
            <div className="flex gap-2">
              {editId === category.id ? (
                <button onClick={() => updateCategory(category.id)} className="bg-[#97BE5A] p-1 rounded text-white">
                  Save
                </button>
              ) : (
                <button onClick={() => {
                  setEditId(category.id);
                  setEditName(category.name);
                }} className="bg-[#FF8BA7] p-1 rounded text-white">
                  Edit
                </button>
              )}
              <button onClick={() => deleteCategory(category.id)} className="bg-red-600 p-1 rounded text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
