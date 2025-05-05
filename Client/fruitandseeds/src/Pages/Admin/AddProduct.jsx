import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
    quantity: 1,
    image: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("فشل جلب التصنيفات", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const selectedFiles = Array.from(files);
      setFormData({ ...formData, image: selectedFiles });

      // إنشاء معاينة للصور
      const previews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else if (name === "categoryIds") {
      const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, categoryIds: selectedCategories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
  
      // 🔥 Update this line
      formData.categoryIds.forEach(categoryIds => data.append("categoryIds[]", categoryIds));
  
      formData.image.forEach(image => data.append("image", image));
  
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      onClose();
    } catch (error) {
      console.error("خطأ أثناء إضافة المنتج", error);
    }
  };
  

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-[#99BC85]/10 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#648C4A]">Add Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#FF8BA7] transition-colors rounded-full p-1 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto max-h-[70vh]">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 pl-7 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="relative">
                <select
                  name="categoryIds"
                  value={formData.categoryIds}
                  onChange={handleChange}
                  multiple
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent bg-gray-50 appearance-none"
                >
                  <option value="">Select categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">Hold Ctrl/Cmd to select multiple categories</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product image</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white shadow-sm">
                          <img
                            src={preview}
                            alt="Preview"
                            className="h-32 w-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center">
                      <label className="cursor-pointer p-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-[#97BE5A] transition-colors h-32 w-full">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          <span className="text-xs text-gray-500">Add more</span>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            multiple
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M20.4 14.5L16 10 4 20" />
                    </svg>
                    <div className="mt-4">
                      <label className="cursor-pointer px-5 py-2.5 bg-[#97BE5A] text-white rounded-lg hover:bg-[#7DA348] transition-colors shadow-sm inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Upload image</span>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                          multiple
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">PNG, JPG or GIF (max 5MB per file)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with actions */}
            <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#97BE5A] text-white rounded-lg hover:bg-[#7DA348] shadow-md hover:shadow-lg transition-all font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;