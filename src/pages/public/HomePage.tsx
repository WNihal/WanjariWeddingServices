import React from 'react';
import Banner from '../../components/public/Banner';
import AboutSection from '../../components/public/AboutSection';
import ServiceCard from '../../components/public/ServiceCard';
import { useData } from '../../contexts/DataContext';
import { UtensilsCrossed, Flower, Camera, MapPin, Phone, Mail } from 'lucide-react';

const HomePage: React.FC = () => {
  const { services } = useData();

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="h-6 w-6 text-burgundy" />;
      case 'Flower':
        return <Flower className="h-6 w-6 text-burgundy" />;
      case 'Camera':
        return <Camera className="h-6 w-6 text-burgundy" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Banner />
      
      <AboutSection />
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">Our Services</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of wedding services to make your special day perfect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">Why Choose Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              With years of experience and countless happy couples, we're committed to making your wedding day unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <svg className="h-8 w-8 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">Experienced Team</h3>
              <p className="text-gray-600">
                Our team brings over 10 years of professional wedding planning experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <svg className="h-8 w-8 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 14.25C8.5 16.17 10.08 17.75 12 17.75C13.92 17.75 15.5 16.17 15.5 14.25C15.5 12.33 13.92 10.75 12 10.75C10.08 10.75 8.5 12.33 8.5 14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.52 14.25C17.52 14.25 19 16.94 20.7 16.94C21.12 16.94 21.5 16.05 21.5 15.74C21.5 13.25 21.35 5.04995 12.01 5.01995C2.68004 5.04995 2.5 13.25 2.5 15.74C2.5 16.05 2.89 16.94 3.3 16.94C5 16.94 6.48 14.25 6.48 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5C12.69 5 13.24 4.45 13.24 3.76V2.24C13.24 1.55 12.69 1 12 1C11.31 1 10.76 1.55 10.76 2.24V3.76C10.76 4.45 11.31 5 12 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.16 7.35002C20.67 6.85002 20.67 6.01002 20.16 5.50002L19.13 4.47002C18.62 3.96002 17.78 3.96002 17.27 4.47002C16.76 4.98002 16.76 5.82002 17.27 6.33002L18.3 7.36002C18.81 7.87002 19.65 7.87002 20.16 7.35002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.73 6.33002C7.24 5.82002 7.24 4.98002 6.73 4.47002C6.22 3.96002 5.38 3.96002 4.87 4.47002L3.84 5.50002C3.33 6.01002 3.33 6.85002 3.84 7.36002C4.35 7.87002 5.19 7.87002 5.7 7.36002L6.73 6.33002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">Creative Solutions</h3>
              <p className="text-gray-600">
                We bring innovative ideas to make your wedding unique and memorable.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <svg className="h-8 w-8 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">Attention to Detail</h3>
              <p className="text-gray-600">
                We take care of every small detail to ensure a smooth and perfect wedding day.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-burgundy/10 rounded-full mb-4">
                <svg className="h-8 w-8 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.44 14.62L20 12.06L17.44 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12.06H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-2">Personalized Service</h3>
              <p className="text-gray-600">
                We tailor our services to match your unique style and vision for the perfect wedding.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">Contact Us</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Ready to plan your dream wedding? Get in touch with us today to schedule a consultation.
            </p>
          </div>
          
          <div className="bg-cream p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-burgundy/10 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-burgundy" />
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">Location</h3>
                <p className="text-gray-600">Nagpur, Maharashtra, India - 440010</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-burgundy/10 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-burgundy" />
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-burgundy/10 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-burgundy" />
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">Email</h3>
                <p className="text-gray-600">info@nihalwanjari.com</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="/contact" 
                className="inline-block bg-burgundy hover:bg-burgundy/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;