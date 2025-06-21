import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Service, Category, GalleryImage } from '../types';

interface DataContextType {
  services: Service[];
  categories: Category[];
  images: GalleryImage[];
  addService: (service: FormData) => Promise<void>;
  updateService: (id: string, service: FormData) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addCategory: (category: FormData) => Promise<void>;
  updateCategory: (id: string, category: FormData) => Promise<void>;
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
      console.log('🔄 Fetching services...');
      const response = await fetch('http://localhost:8080/api/services');
      
      if (response.ok) {
        const data = await response.json();
        console.log('📥 Raw services data from backend:', data);
        console.log('📊 Number of services received:', data.length);
        
        if (!Array.isArray(data)) {
          console.error('❌ Services data is not an array:', typeof data);
          return [];
        }
        
        const transformedServices = data.map((service: any, index: number) => {
          console.log(`🔄 Transforming service ${index + 1}:`, service);
          return {
            id: service.id.toString(),
            name: service.name,
            description: service.description,
            thumbnail: service.thumbnail,
            icon: service.icon
          };
        });
        
        console.log('✅ Transformed services:', transformedServices);
        console.log('📊 Number of transformed services:', transformedServices.length);
        
        setServices(transformedServices);
        return transformedServices;
      } else {
        console.error('❌ Failed to fetch services:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
      }
    } catch (error) {
      console.error('❌ Error fetching services:', error);
      return [];
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      console.log('🔄 Fetching categories...');
      const response = await fetch('http://localhost:8080/api/categories');
      
      if (response.ok) {
        const data = await response.json();
        console.log('📥 Raw categories data from backend:', data);
        console.log('📊 Number of categories received:', data.length);
        
        if (!Array.isArray(data)) {
          console.error('❌ Categories data is not an array:', typeof data);
          return [];
        }
        
        const transformedCategories = data.map((category: any, index: number) => {
          console.log(`🔄 Transforming category ${index + 1}:`, category);
          return {
            id: category.id.toString(),
            serviceId: category.service?.id?.toString() || '',
            name: category.name,
            description: category.description,
            thumbnail: category.thumbnail
          };
        });
        
        console.log('✅ Transformed categories:', transformedCategories);
        console.log('📊 Number of transformed categories:', transformedCategories.length);
        
        setCategories(transformedCategories);
        return transformedCategories;
      } else {
        console.error('❌ Failed to fetch categories:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
      }
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      return [];
    }
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      console.log('🔄 Fetching images...');
      const response = await fetch('http://localhost:8080/api/images');
      
      if (response.ok) {
        const data = await response.json();
        console.log('📥 Raw images data from backend:', data);
        console.log('📊 Number of images received:', data.length);
        
        if (!Array.isArray(data)) {
          console.error('❌ Images data is not an array:', typeof data);
          return [];
        }
        
        const transformedImages = data.map((image: any, index: number) => {
          console.log(`🔄 Transforming image ${index + 1}:`, image);
          return {
            id: image.id.toString(),
            categoryId: image.category?.id?.toString() || '',
            url: image.url || `http://localhost:8080/api/images/${image.fileName}`,
            caption: image.caption || ''
          };
        });
        
        console.log('✅ Transformed images:', transformedImages);
        console.log('📊 Number of transformed images:', transformedImages.length);
        
        setImages(transformedImages);
        return transformedImages;
      } else {
        console.error('❌ Failed to fetch images:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
      }
    } catch (error) {
      console.error('❌ Error fetching images:', error);
      return [];
    }
  }, []);

  const refreshData = useCallback(async () => {
    console.log('🔄 Refreshing all data...');
    const results = await Promise.all([
      fetchServices(),
      fetchCategories(),
      fetchImages()
    ]);
    console.log('✅ Data refresh complete:', {
      services: results[0]?.length || 0,
      categories: results[1]?.length || 0,
      images: results[2]?.length || 0
    });
  }, [fetchServices, fetchCategories, fetchImages]);

  // Fetch initial data
  useEffect(() => {
    console.log('🚀 Initial data fetch...');
    refreshData();
  }, [refreshData]);

  // Service operations
  const addService = async (formData: FormData) => {
    try {
      console.log('➕ Adding service with FormData');
      const response = await fetch('http://localhost:8080/api/services', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const newService = await response.json();
        console.log('✅ Service added successfully:', newService);
        await fetchServices();
      } else {
        console.error('❌ Failed to add service:', response.status, response.statusText);
        throw new Error('Failed to add service');
      }
    } catch (error) {
      console.error('❌ Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (id: string, formData: FormData) => {
    try {
      console.log('✏️ Updating service:', id);
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const updatedService = await response.json();
        console.log('✅ Service updated successfully:', updatedService);
        await fetchServices();
      } else {
        console.error('❌ Failed to update service:', response.status, response.statusText);
        throw new Error('Failed to update service');
      }
    } catch (error) {
      console.error('❌ Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      console.log('🗑️ Deleting service:', id);
      const response = await fetch(`http://localhost:8080/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('✅ Service deleted successfully');
        await refreshData();
      } else {
        console.error('❌ Failed to delete service:', response.status, response.statusText);
        throw new Error('Failed to delete service');
      }
    } catch (error) {
      console.error('❌ Error deleting service:', error);
      throw error;
    }
  };

  // Category operations
  const addCategory = async (formData: FormData) => {
    try {
      console.log('➕ Adding category with FormData');
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const newCategory = await response.json();
        console.log('✅ Category added successfully:', newCategory);
        await fetchCategories();
      } else {
        console.error('❌ Failed to add category:', response.status, response.statusText);
        throw new Error('Failed to add category');
      }
    } catch (error) {
      console.error('❌ Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, formData: FormData) => {
    try {
      console.log('✏️ Updating category:', id);
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        console.log('✅ Category updated successfully:', updatedCategory);
        await fetchCategories();
      } else {
        console.error('❌ Failed to update category:', response.status, response.statusText);
        throw new Error('Failed to update category');
      }
    } catch (error) {
      console.error('❌ Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      console.log('🗑️ Deleting category:', id);
      const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('✅ Category deleted successfully');
        await fetchCategories();
        await fetchImages();
      } else {
        console.error('❌ Failed to delete category:', response.status, response.statusText);
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('❌ Error deleting category:', error);
      throw error;
    }
  };

  // Image operations
  const addImage = async (formData: FormData) => {
    try {
      console.log('➕ Adding image for category:', formData.get('categoryId'));
      const response = await fetch(`http://localhost:8080/api/images/${formData.get('categoryId')}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();
        console.log('✅ Image added successfully:', newImage);
        await fetchImages();
      } else {
        console.error('❌ Failed to add image:', response.status, response.statusText);
        throw new Error('Failed to add image');
      }
    } catch (error) {
      console.error('❌ Error adding image:', error);
      throw error;
    }
  };

  const updateImage = async (id: string, formData: FormData) => {
    try {
      console.log('✏️ Updating image:', id);
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (response.ok) {
        const updatedImage = await response.json();
        console.log('✅ Image updated successfully:', updatedImage);
        await fetchImages();
      } else {
        console.error('❌ Failed to update image:', response.status, response.statusText);
        throw new Error('Failed to update image');
      }
    } catch (error) {
      console.error('❌ Error updating image:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      console.log('🗑️ Deleting image:', id);
      const response = await fetch(`http://localhost:8080/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        console.log('✅ Image deleted successfully');
        await fetchImages();
      } else {
        console.error('❌ Failed to delete image:', response.status, response.statusText);
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('❌ Error deleting image:', error);
      throw error;
    }
  };

  // Utility functions
  const getServiceById = useCallback((id: string) => {
    const service = services.find((service) => service.id === id);
    console.log(`🔍 Getting service by ID ${id}:`, service);
    console.log(`📊 Total services available:`, services.length);
    return service;
  }, [services]);

  const getCategoryById = useCallback((id: string) => {
    const category = categories.find((category) => category.id === id);
    console.log(`🔍 Getting category by ID ${id}:`, category);
    console.log(`📊 Total categories available:`, categories.length);
    return category;
  }, [categories]);

  const getCategoriesByService = useCallback((serviceId: string) => {
    const serviceCategories = categories.filter((category) => category.serviceId === serviceId);
    console.log(`🔍 Getting categories for service ${serviceId}:`, serviceCategories);
    console.log(`📊 Total categories available:`, categories.length);
    console.log(`📊 Categories for this service:`, serviceCategories.length);
    return serviceCategories;
  }, [categories]);

  const getImagesByCategory = useCallback((categoryId: string) => {
    const categoryImages = images.filter((image) => image.categoryId === categoryId);
    console.log(`🔍 Getting images for category ${categoryId}:`, categoryImages);
    console.log(`📊 Total images available:`, images.length);
    console.log(`📊 Images for this category:`, categoryImages.length);
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