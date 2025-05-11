import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import ImageGallery from '../../components/public/ImageGallery';

const CategoryDetailPage: React.FC = () => {
  const { serviceId, categoryId } = useParams<{ serviceId: string; categoryId: string }>();
  const { getServiceById, getCategoryById, getImagesByCategory } = useData();
  
  const service = getServiceById(serviceId || '');
  const category = getCategoryById(categoryId || '');
  const images = getImagesByCategory(categoryId || '');

  if (!service || !category) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Category not found</h1>
          <Link to="/" className="mt-4 inline-flex items-center text-burgundy hover:text-burgundy/80">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="pt-20 relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${category.thumbnail})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{category.name}</h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/90">{category.description}</p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-burgundy hover:text-burgundy/80">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to={`/services/${service.id}`} className="text-burgundy hover:text-burgundy/80">{service.name}</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">{category.name}</span>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-8">Gallery</h2>
        
        {images.length === 0 ? (
          <p className="text-gray-600">No images available for this category.</p>
        ) : (
          <ImageGallery images={images} />
        )}
      </div>
      
      {/* CTA Section */}
      <div className="bg-cream py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
            Like what you see?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us today to discuss how we can provide similar services for your wedding day.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-burgundy hover:bg-burgundy/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;