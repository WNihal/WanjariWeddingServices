import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, ArrowLeft, ImageIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import CategoryForm from '../../components/admin/CategoryForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { Category } from '../../types';

const CategoriesManagePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const { 
    getServiceById, 
    getCategoriesByService, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    getImagesByCategory,
    refreshData
  } = useData();
  
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Refresh data to ensure we have the latest
        await refreshData();
        
        // Get service and categories
        const serviceData = getServiceById(serviceId || '');
        const categoriesData = getCategoriesByService(serviceId || '');
        
        setService(serviceData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) {
      loadData();
    }
  }, [serviceId, getServiceById, getCategoriesByService, refreshData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy"></div>
      </div>
    );
  }

  // Redirect if service not found
  if (!service) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Service not found</p>
        <Link 
          to="/admin/services" 
          className="inline-flex items-center text-burgundy hover:text-burgundy/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const handleAddCategory = async (categoryData: Omit<Category, 'id'>) => {
    await addCategory(categoryData);
    setIsAddModalOpen(false);
    // Refresh categories after adding
    const updatedCategories = getCategoriesByService(serviceId || '');
    setCategories(updatedCategories);
  };

  const handleUpdateCategory = async (categoryData: Partial<Category>) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, categoryData);
      setEditingCategory(null);
      // Refresh categories after updating
      const updatedCategories = getCategoriesByService(serviceId || '');
      setCategories(updatedCategories);
    }
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete.id);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      // Refresh categories after deleting
      const updatedCategories = getCategoriesByService(serviceId || '');
      setCategories(updatedCategories);
    }
  };

  const getImageCount = (categoryId: string) => {
    return getImagesByCategory(categoryId).length;
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/admin/services" 
          className="mr-4 p-2 text-gray-500 hover:text-burgundy hover:bg-burgundy/10 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{service.name} Categories</h1>
          <p className="text-gray-600">Manage categories for this service</p>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-burgundy hover:bg-burgundy/90 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
          
          {categories.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No categories found</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-2 text-burgundy hover:text-burgundy/80 font-medium"
              >
                Add your first category
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={category.thumbnail}
                              alt={category.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2">{category.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/admin/gallery/${category.id}`)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <ImageIcon className="h-3.5 w-3.5 mr-1" />
                          {getImageCount(category.id)} Images
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Category</h3>
            </div>
            <div className="p-6">
              <CategoryForm
                serviceId={serviceId || ''}
                onSubmit={handleAddCategory}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Category</h3>
            </div>
            <div className="p-6">
              <CategoryForm
                serviceId={serviceId || ''}
                initialData={editingCategory}
                onSubmit={handleUpdateCategory}
                onCancel={() => setEditingCategory(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This will also delete all associated images.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteCategory}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CategoriesManagePage;