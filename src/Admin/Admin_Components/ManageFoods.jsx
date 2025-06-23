import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash, Edit, Search, X } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    category: '', // Stores category ID
    price: '',
    description: '',
    image: null,
    imagePreview: ''
  });

  // Create category map for quick lookup
  const categoryMap = useMemo(() => {
    return categories.reduce((map, category) => {
      map[category._id] = category.categoryName;
      return map;
    }, {});
  }, [categories]);

  // Fetch foods and categories on component mount
  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/food/menu');
      if (response.data.success) {
        // Flatten the nested food structure
        const allFoods = response.data.data.flatMap(category => 
          category.foods.map(food => ({
            ...food,
            categoryId: category.categoryId,
            categoryName: category.categoryName
          }))
        );
        setFoods(allFoods || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch foods');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch foods';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching foods:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/allCategory');
      if (response.data.success) {
        setCategories(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch categories';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error fetching categories:', err);
    }
  };

  // Filter foods based on search term
  const filteredFoods = foods.filter(food => {
    const searchLower = searchTerm.toLowerCase();
    const categoryName = categoryMap[food.categoryId] || '';
    return (
      (food.foodName?.toLowerCase().includes(searchLower)) ||
      (categoryName.toLowerCase().includes(searchLower)) ||
      (food.description?.toLowerCase().includes(searchLower))
    );
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: null,
      imagePreview: ''
    });
    setCurrentFood(null);
  };

  // Open form for adding new food
  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  // Open form for editing food
  const openEditForm = (food) => {
    setCurrentFood(food);
    setFormData({
      name: food.foodName,
      category: food.categoryId, // Use category ID
      price: (food.price / 100).toFixed(2),
      description: food.description,
      image: null,
      imagePreview: food.image || ''
    });
    setIsFormOpen(true);
  };

  

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate price
  const priceValue = parseFloat(formData.price);
  if (isNaN(priceValue)) {
    setError('Please enter a valid price');
    toast.error('Please enter a valid price');
    return;
  }

  try {
    const foodData = new FormData();
    foodData.append('foodName', formData.name);
    foodData.append('categoryName', formData.category); // Changed from 'category' to 'categoryName'
    foodData.append('price', Math.round(priceValue * 100)); // Convert to cents
    foodData.append('description', formData.description);
    
    if (formData.image) {
      foodData.append('image', formData.image);
    }

    let response;
    if (currentFood) {
      // Update existing food
      response = await axios.put(
        `http://localhost:5000/api/food/update/${currentFood._id}`,
        foodData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success('Food item updated successfully');
    } else {
      // Add new food
      response = await axios.post(
        'http://localhost:5000/api/food/createnew',
        foodData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success('Food item created successfully');
    }
    
    await fetchFoods();
    setIsFormOpen(false);
    resetForm();
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Failed to save food item';
    setError(errorMsg);
    toast.error(errorMsg);
    console.error('Error saving food item:', err);
  }
};
  // Delete food
  const deleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/food/delete/${id}`);
        toast.success('Food item deleted successfully');
        await fetchFoods();
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to delete food item';
        setError(errorMsg);
        toast.error(errorMsg);
        console.error('Error deleting food item:', err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-64 font-Funnel_Display">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Foods</h1>
        <button 
          onClick={openAddForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Add New Food
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

      {/* Food Items Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search foods..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">Loading foods...</div>
        ) : filteredFoods.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {foods.length === 0 ? 'No food items found' : 'No matching food items found'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFoods.map((food) => (
                  <tr key={food._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200">
                        {food.image ? (
                          <img 
                            src={food.image} 
                            alt={food.foodName} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentElement.innerHTML = '<div class="h-full w-full flex items-center justify-center"><span class="text-xs text-gray-500">No Image</span></div>';
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{food.foodName}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{food.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categoryMap[food.categoryId] || food.categoryName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(food.price / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditForm(food)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deleteFood(food._id)}
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
          </div>
        )}
      </div>

      {/* Add/Edit Food Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentFood ? 'Edit Food Item' : 'Add New Food Item'}
              </h2>
              <button 
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Food Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                  <div className="mt-1 flex items-center">
                    <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                      <span>{formData.imagePreview ? 'Change Image' : 'Upload Image'}</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  
                  {formData.imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                      <div className="h-32 w-32 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={formData.imagePreview} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
                >
                  {currentFood ? 'Update Food' : 'Add Food'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageFoods;