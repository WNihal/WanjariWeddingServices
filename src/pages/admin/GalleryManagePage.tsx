import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import ImageForm from '../../components/admin/ImageForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { GalleryImage } from '../../types';

const GalleryManagePage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const {
    getCategoryById,
    getServiceById,
    getImagesByCategory,
    addImage,
    updateImage,
    deleteImage
  } = useData();

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);

  // Update category, service, and images when data changes
  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId);
      const serviceData = categoryData ? getServiceById(categoryData.serviceId) : undefined;
      const imagesData = getImagesByCategory(categoryId);
      
      setCategory(categoryData);
      setService(serviceData);
      setImages(imagesData);
    }
  }, [categoryId, getCategoryById, getServiceById, getImagesByCategory]);

  if (!category || !service) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Category not found</p>
        <Link
          to="/admin/services"
          className="inline-flex items-center text-burgundy hover:text-burgundy/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const handleAddImage = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await addImage(formData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add image:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateImage = async (formData: FormData) => {
    if (editingImage) {
      setIsLoading(true);
      try {
        await updateImage(editingImage.id, formData);
        setEditingImage(null);
      } catch (error) {
        console.error('Failed to update image:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteImage = async () => {
    if (imageToDelete) {
      setIsLoading(true);
      try {
        await deleteImage(imageToDelete.id);
        setIsDeleteModalOpen(false);
        setImageToDelete(null);
      } catch (error) {
        console.error('Failed to delete image:', error);
        // You could add error handling UI here
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to={`/admin/categories/${service.id}`}
          className="mr-4 p-2 text-gray-500 hover:text-burgundy hover:bg-burgundy/10 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="text-sm text-gray-500 mb-1">
            {service.name} / {category.name}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-gray-600">Manage images for {category.name}</p>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={isLoading}
          className="bg-burgundy hover:bg-burgundy/90 text-white px-4 py-2 rounded-md flex items-center transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      {/* Image Grid */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Gallery Images</h2>

          {images.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No images found</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-2 text-burgundy hover:text-burgundy/80 font-medium"
              >
                Add your first image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="group relative rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={image.url}
                      alt={image.caption || 'Gallery image'}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {image.caption && (
                    <div className="p-3 bg-white">
                      <p className="text-sm text-gray-600 line-clamp-2">{image.caption}</p>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setEditingImage(image)}
                        disabled={isLoading}
                        className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setImageToDelete(image);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={isLoading}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Image</h3>
            </div>
            <div className="p-6">
              <ImageForm
                categoryId={categoryId || ''}
                onSubmit={handleAddImage}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Image</h3>
            </div>
            <div className="p-6">
              <ImageForm
                categoryId={categoryId || ''}
                initialData={editingImage}
                onSubmit={handleUpdateImage}
                onCancel={() => setEditingImage(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteImage}
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

export default GalleryManagePage;