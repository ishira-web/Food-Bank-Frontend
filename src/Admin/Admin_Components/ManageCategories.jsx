import React, { useState, useEffect } from 'react';
import { Plus, Trash, Edit, Search, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://food-bank-backend-gqeu.onrender.com/api/category/allCategory');
      setCategories(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open form for adding new category
  const openAddForm = () => {
    setCurrentCategory(null);
    setCategoryName('');
    setIsFormOpen(true);
  };

  // Open form for editing category
  const openEditForm = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.categoryName);
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (categoryName.trim() === '') return;

    try {
      if (currentCategory) {
        // Update existing category
        await axios.put(`https://food-bank-backend-gqeu.onrender.com/api/category/update/${currentCategory._id}`, {
          categoryName: categoryName.trim()
        });
      } else {
        // Add new category
        await axios.post('https://food-bank-backend-gqeu.onrender.com/api/category/create', {
          categoryName: categoryName.trim()
        });
      }
      
      // Refresh the categories list
      await fetchCategories();
      setIsFormOpen(false);
      setCategoryName('');
      toast.success('Category create successfully !')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
      console.error('Error saving category:', err);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`https://food-bank-backend-gqeu.onrender.com/api/category/delete/${id}`);
        // Refresh the categories list
        await fetchCategories();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete category');
        console.error('Error deleting category:', err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
        <button 
          onClick={openAddForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add New Category
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button onClick={() => setError(null)} className="float-right font-bold">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">Loading categories...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.categoryName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => openEditForm(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteCategory(category._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Category Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
                >
                  {currentCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCategories;