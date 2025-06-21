import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, LayoutList } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import ServiceForm from '../../components/admin/ServiceForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { Service } from '../../types';

const ServicesManagePage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddService = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await addService(formData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add service:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateService = async (formData: FormData) => {
    if (editingService) {
      setIsLoading(true);
      try {
        await updateService(editingService.id, formData);
        setEditingService(null);
      } catch (error) {
        console.error('Failed to update service:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openDeleteModal = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (serviceToDelete) {
      setIsLoading(true);
      try {
        await deleteService(serviceToDelete.id);
        setIsDeleteModalOpen(false);
        setServiceToDelete(null);
      } catch (error) {
        console.error('Failed to delete service:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'UtensilsCrossed':
        return 'Catering';
      case 'Flower':
        return 'Decoration';
      case 'Camera':
        return 'Photography';
      default:
        return 'Service';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          <p className="text-gray-600">Add, edit or remove wedding services</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={isLoading}
          className="bg-burgundy hover:bg-burgundy/90 text-white px-4 py-2 rounded-md flex items-center transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Services</h2>

          {services.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No services found</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-2 text-burgundy hover:text-burgundy/80 font-medium"
              >
                Add your first service
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categories
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={service.thumbnail}
                              alt={service.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{getServiceIcon(service.icon)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2">{service.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/categories/${service.id}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <LayoutList className="h-3.5 w-3.5 mr-1" />
                          Manage
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingService(service)}
                          disabled={isLoading}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(service)}
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

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Service</h3>
            </div>
            <div className="p-6">
              <ServiceForm
                onSubmit={handleAddService}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Service</h3>
            </div>
            <div className="p-6">
              <ServiceForm
                initialData={editingService}
                onSubmit={handleUpdateService}
                onCancel={() => setEditingService(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.name}"? This will also delete all associated categories and images.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteService}
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

export default ServicesManagePage;