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
    fetchServices();
    fetchCategories();
    fetchImages();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
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
        setCategories(data);
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
        setImages(data);
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
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        const newService = await response.json();
        setServices([...services, newService]);
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
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        const updatedService = await response.json();
        setServices(services.map(s => s.id === id ? updatedService : s));
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter(s => s.id !== id));
        // Also remove associated categories and images
        const categoryIds = categories.filter(c => c.serviceId === id).map(c => c.id);
        setCategories(categories.filter(c => c.serviceId !== id));
        setImages(images.filter(i => !categoryIds.includes(i.categoryId)));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Category operations
  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories(categories.map(c => c.id === id ? updatedCategory : c));
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id));
        // Also remove associated images
        setImages(images.filter(i => i.categoryId !== id));
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Image operations
  const addImage = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:8080/api/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages([...images, newImage]);
      }
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const updateImage = async (id: string, formData: FormData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setImages(images.map(i => i.id === id ? updatedImage : i));
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages(images.filter(i => i.id !== id));
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};