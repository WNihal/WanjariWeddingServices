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
    getImagesByCategory
  } = useData();
  
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Update service and categories when data changes
  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceById(serviceId);
      const categoriesData = getCategoriesByService(serviceId);
      setService(serviceData);
      setCategories(categoriesData);
    }
  }, [serviceId, getServiceById, getCategoriesByService]);

  // Redirect if service not found
  if (!service && serviceId) {
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
    setIsLoading(true);
    try {
      await addCategory(categoryData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add category:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (categoryData: Partial<Category>) => {
    if (editingCategory) {
      setIsLoading(true);
      try {
        await updateCategory(editingCategory.id, categoryData);
        setEditingCategory(null);
      } catch (error) {
        console.error('Failed to update category:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      setIsLoading(true);
      try {
        await deleteCategory(categoryToDelete.id);
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Failed to delete category:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
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
          <h1 className="text-2xl font-bold text-gray-800">{service?.name} Categories</h1>
          <p className="text-gray-600">Manage categories for this service</p>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={isLoading}
          className="bg-burgundy hover:bg-burgundy/90 text-white px-4 py-2 rounded-md flex items-center transition-colors disabled:opacity-50"
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
                          disabled={isLoading}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagePage;