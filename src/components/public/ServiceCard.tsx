import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={service.thumbnail} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6 relative">
        <h3 className="text-2xl font-serif font-semibold text-charcoal">{service.name}</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">{service.description}</p>
        <Link 
          to={`/services/${service.id}`} 
          className="inline-flex items-center mt-4 text-burgundy hover:text-burgundy/80 font-medium transition-colors"
        >
          Explore More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;