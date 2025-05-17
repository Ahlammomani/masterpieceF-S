import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      setError("Failed to delete category");
      console.error("Error deleting category:", err);
    }
  };

  const updateCategory = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, { name: editName });
      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      setError("Failed to update category");
      console.error("Error updating category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-[#FDFAF6] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#2C5F2D]">Manage Categories</h2>
          <button 
            className="bg-[#97BE5A] hover:bg-[#7EA84B] text-white px-4 py-2 rounded-lg shadow transition-colors"
            onClick={() => {
              setEditId("new");
              setEditName("");
            }}
          >
            + Add New Category
          </button>
        </div>

        {error && (
          <div className="bg-[#FF8BA7] text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99BC85]"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {editId === "new" && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-[#99BC85]">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="New category name"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      if (editName.trim()) {
                        updateCategory("new");
                      }
                    }}
                    className="bg-[#97BE5A] hover:bg-[#7EA84B] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-[#99BC85]"
              >
                {editId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => updateCategory(category.id)}
                        className="bg-[#97BE5A] hover:bg-[#7EA84B] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-[#2C5F2D]">
                        {category.name}
                      </h3>
                      {/* <span className="bg-[#FF8BA7] text-white text-xs px-2 py-1 rounded-full">
                        {category.productCount || 0} products
                      </span> */}
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setEditId(category.id);
                          setEditName(category.name);
                        }}
                        className="bg-[#FF8BA7] hover:bg-[#E67A95] text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;