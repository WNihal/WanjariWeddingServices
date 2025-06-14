import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Service, Category, GalleryImage } from '../types';

interface DataContextType {
  services: Service[];
  categories: Category[];
  images: GalleryImage[];
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addImage: (image: FormData) => Promise<void>;
  updateImage: (id: string, image: FormData) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  getServiceById: (id: string) => Service | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getCategoriesByService: (serviceId: string) => Category[];
  getImagesByCategory: (categoryId: string) => GalleryImage[];
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/services');
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedServices = data.map((service: any) => ({
          id: service.id.toString(),
          name: service.name,
          description: service.description,
          thumbnail: service.thumbnail,
          icon: service.icon
        }));
        setServices(transformedServices);
        return transformedServices;
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedCategories = data.map((category: any) => ({
          id: category.id.toString(),
          serviceId: category.service?.id?.toString() || '',
          name: category.name,
          description: category.description,
          thumbnail: category.thumbnail
        }));
        setCategories(transformedCategories);
        return transformedCategories;
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/images');
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedImages = data.map((image: any) => ({
          id: image.id.toString(),
          categoryId: image.category?.id?.toString() || '',
          url: `http://localhost:8080/api/images/${image.fileName}`,
          caption: image.caption || ''
        }));
        setImages(transformedImages);
        return transformedImages;
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchServices(),
      fetchCategories(),
      fetchImages()
    ]);
  }, [fetchServices, fetchCategories, fetchImages]);

  // Fetch initial data
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Service operations
  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        // Immediately refresh services to show the new one
        await fetchServices();
      } else {
        throw new Error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    try {
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        // Immediately refresh services to show the updated one
        await fetchServices();
      } else {
        throw new Error('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        // Refresh all data since categories and images might be affected
        await refreshData();
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  // Category operations
  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const categoryData = {
        name: category.name,
        description: category.description,
        thumbnail: category.thumbnail,
        service: { id: parseInt(category.serviceId) }
      };

      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        // Immediately refresh categories to show the new one
        await fetchCategories();
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      const categoryData = {
        name: category.name,
        description: category.description,
        thumbnail: category.thumbnail,
        service: category.serviceId ? { id: parseInt(category.serviceId) } : undefined
      };

      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        // Immediately refresh categories to show the updated one
        await fetchCategories();
      } else {
        throw new Error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        // Refresh categories and images as they might be affected
        await fetchCategories();
        await fetchImages();
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  // Image operations
  const addImage = async (formData: FormData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${formData.get('categoryId')}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        // Immediately refresh images to show the new one
        await fetchImages();
      } else {
        throw new Error('Failed to add image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      throw error;
    }
  };

  const updateImage = async (id: string, formData: FormData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        // Immediately refresh images to show the updated one
        await fetchImages();
      } else {
        throw new Error('Failed to update image');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        // Immediately refresh images to show the deletion
        await fetchImages();
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  // Utility functions - memoized to prevent unnecessary re-renders
  const getServiceById = useCallback((id: string) => {
    return services.find((service) => service.id === id);
  }, [services]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find((category) => category.id === id);
  }, [categories]);

  const getCategoriesByService = useCallback((serviceId: string) => {
    return categories.filter((category) => category.serviceId === serviceId);
  }, [categories]);

  const getImagesByCategory = useCallback((categoryId: string) => {
    return images.filter((image) => image.categoryId === categoryId);
  }, [images]);

  const value = {
    services,
    categories,
    images,
    addService,
    updateService,
    deleteService,
    addCategory,
    updateCategory,
    deleteCategory,
    addImage,
    updateImage,
    deleteImage,
    getServiceById,
    getCategoryById,
    getCategoriesByService,
    getImagesByCategory,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};