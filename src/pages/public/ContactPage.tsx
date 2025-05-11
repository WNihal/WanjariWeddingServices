import React from 'react';
import ContactForm from '../../components/public/ContactForm';
import ContactInfo from '../../components/public/ContactInfo';

const ContactPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="pt-20 relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/90">Get in touch to discuss your wedding requirements</p>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      
      {/* Map Section */}
      <div className="h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Google Maps would be embedded here in a production site</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;