import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import CategoryCard from '../../components/public/CategoryCard';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { getServiceById, getCategoriesByService } = useData();
  
  const service = getServiceById(serviceId || '');
  const categories = getCategoriesByService(serviceId || '');

  if (!service) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Service not found</h1>
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
      <div className="pt-20 relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${service.thumbnail})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{service.name}</h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/90">{service.description}</p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-burgundy hover:text-burgundy/80">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">{service.name}</span>
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-8">Categories</h2>
        
        {categories.length === 0 ? (
          <p className="text-gray-600">No categories available for this service.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} serviceId={service.id} />
            ))}
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="bg-cream py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
            Interested in our {service.name}?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us today to discuss your requirements and how we can make your wedding day special.
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

export default ServiceDetailPage;