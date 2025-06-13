import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  // Fetch initial data
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    await Promise.all([
      fetchServices(),
      fetchCategories(),
      fetchImages()
    ]);
  };

  const fetchServices = async () => {
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
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchCategories = async () => {
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
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchImages = async () => {
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
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

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
        await fetchServices(); // Refresh services list
      }
    } catch (error) {
      console.error('Error adding service:', error);
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
        await fetchServices(); // Refresh services list
      }
    } catch (error) {
      console.error('Error updating service:', error);
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
        await refreshData(); // Refresh all data since categories and images might be affected
      }
    } catch (error) {
      console.error('Error deleting service:', error);
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
        await fetchCategories(); // Refresh categories list
      }
    } catch (error) {
      console.error('Error adding category:', error);
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
        await fetchCategories(); // Refresh categories list
      }
    } catch (error) {
      console.error('Error updating category:', error);
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
        await fetchCategories(); // Refresh categories list
        await fetchImages(); // Refresh images as they might be affected
      }
    } catch (error) {
      console.error('Error deleting category:', error);
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
        await fetchImages(); // Refresh images list
      }
    } catch (error) {
      console.error('Error adding image:', error);
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
        await fetchImages(); // Refresh images list
      }
    } catch (error) {
      console.error('Error updating image:', error);
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
        await fetchImages(); // Refresh images list
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Utility functions
  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id);
  };

  const getCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
  };

  const getCategoriesByService = (serviceId: string) => {
    return categories.filter((category) => category.serviceId === serviceId);
  };

  const getImagesByCategory = (categoryId: string) => {
    return images.filter((image) => image.categoryId === categoryId);
  };

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