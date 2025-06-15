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
      console.log('Fetching services...');
      const response = await fetch('http://localhost:8080/api/services');
      if (response.ok) {
        const data = await response.json();
        console.log('Raw services data from backend:', data);
        
        // Transform backend data to frontend format
        const transformedServices = data.map((service: any) => ({
          id: service.id.toString(),
          name: service.name,
          description: service.description,
          thumbnail: service.thumbnail,
          icon: service.icon
        }));
        
        console.log('Transformed services:', transformedServices);
        setServices(transformedServices);
        return transformedServices;
      } else {
        console.error('Failed to fetch services:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      console.log('Fetching categories...');
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        console.log('Raw categories data from backend:', data);
        
        // Transform backend data to frontend format
        const transformedCategories = data.map((category: any) => ({
          id: category.id.toString(),
          serviceId: category.service?.id?.toString() || '',
          name: category.name,
          description: category.description,
          thumbnail: category.thumbnail
        }));
        
        console.log('Transformed categories:', transformedCategories);
        setCategories(transformedCategories);
        return transformedCategories;
      } else {
        console.error('Failed to fetch categories:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      console.log('Fetching images...');
      const response = await fetch('http://localhost:8080/api/images');
      if (response.ok) {
        const data = await response.json();
        console.log('Raw images data from backend:', data);
        
        // Transform backend data to frontend format
        const transformedImages = data.map((image: any) => ({
          id: image.id.toString(),
          categoryId: image.category?.id?.toString() || '',
          url: `http://localhost:8080/api/images/${image.fileName}`,
          caption: image.caption || ''
        }));
        
        console.log('Transformed images:', transformedImages);
        setImages(transformedImages);
        return transformedImages;
      } else {
        console.error('Failed to fetch images:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }, []);

  const refreshData = useCallback(async () => {
    console.log('Refreshing all data...');
    await Promise.all([
      fetchServices(),
      fetchCategories(),
      fetchImages()
    ]);
  }, [fetchServices, fetchCategories, fetchImages]);

  // Fetch initial data
  useEffect(() => {
    console.log('Initial data fetch...');
    refreshData();
  }, [refreshData]);

  // Service operations
  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      console.log('Adding service:', service);
      const response = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        console.log('Service added successfully');
        // Immediately refresh services to show the new one
        await fetchServices();
      } else {
        console.error('Failed to add service:', response.status, response.statusText);
        throw new Error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    try {
      console.log('Updating service:', id, service);
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        console.log('Service updated successfully');
        // Immediately refresh services to show the updated one
        await fetchServices();
      } else {
        console.error('Failed to update service:', response.status, response.statusText);
        throw new Error('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      console.log('Deleting service:', id);
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('Service deleted successfully');
        // Refresh all data since categories and images might be affected
        await refreshData();
      } else {
        console.error('Failed to delete service:', response.status, response.statusText);
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
      console.log('Adding category:', category);
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
        console.log('Category added successfully');
        // Immediately refresh categories to show the new one
        await fetchCategories();
      } else {
        console.error('Failed to add category:', response.status, response.statusText);
        throw new Error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      console.log('Updating category:', id, category);
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
        console.log('Category updated successfully');
        // Immediately refresh categories to show the updated one
        await fetchCategories();
      } else {
        console.error('Failed to update category:', response.status, response.statusText);
        throw new Error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      console.log('Deleting category:', id);
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('Category deleted successfully');
        // Refresh categories and images as they might be affected
        await fetchCategories();
        await fetchImages();
      } else {
        console.error('Failed to delete category:', response.status, response.statusText);
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
      console.log('Adding image for category:', formData.get('categoryId'));
      const response = await fetch(`http://localhost:8080/api/images/${formData.get('categoryId')}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Image added successfully');
        // Immediately refresh images to show the new one
        await fetchImages();
      } else {
        console.error('Failed to add image:', response.status, response.statusText);
        throw new Error('Failed to add image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      throw error;
    }
  };

  const updateImage = async (id: string, formData: FormData) => {
    try {
      console.log('Updating image:', id);
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Image updated successfully');
        // Immediately refresh images to show the updated one
        await fetchImages();
      } else {
        console.error('Failed to update image:', response.status, response.statusText);
        throw new Error('Failed to update image');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      console.log('Deleting image:', id);
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('Image deleted successfully');
        // Immediately refresh images to show the deletion
        await fetchImages();
      } else {
        console.error('Failed to delete image:', response.status, response.statusText);
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  // Utility functions - memoized to prevent unnecessary re-renders
  const getServiceById = useCallback((id: string) => {
    const service = services.find((service) => service.id === id);
    console.log(`Getting service by ID ${id}:`, service);
    return service;
  }, [services]);

  const getCategoryById = useCallback((id: string) => {
    const category = categories.find((category) => category.id === id);
    console.log(`Getting category by ID ${id}:`, category);
    return category;
  }, [categories]);

  const getCategoriesByService = useCallback((serviceId: string) => {
    const serviceCategories = categories.filter((category) => category.serviceId === serviceId);
    console.log(`Getting categories for service ${serviceId}:`, serviceCategories);
    return serviceCategories;
  }, [categories]);

  const getImagesByCategory = useCallback((categoryId: string) => {
    const categoryImages = images.filter((image) => image.categoryId === categoryId);
    console.log(`Getting images for category ${categoryId}:`, categoryImages);
    return categoryImages;
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