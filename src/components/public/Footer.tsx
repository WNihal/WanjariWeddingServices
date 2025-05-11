import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const Footer: React.FC = () => {
  const { services } = useData();
  
  return (
    <footer className="bg-charcoal text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-gold">Nihal Wanjari</h3>
            <p className="mb-2">Premium Wedding Services in Nagpur</p>
            <div className="flex items-start mt-4">
              <MapPin className="mr-2 h-5 w-5 text-gold shrink-0 mt-1" />
              <p>
                Nagpur, Maharashtra, India - 440001
              </p>
            </div>
            <div className="flex items-center mt-3">
              <Phone className="mr-2 h-5 w-5 text-gold" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center mt-3">
              <Mail className="mr-2 h-5 w-5 text-gold" />
              <p>info@nihalwanjari.com</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/services/${service.id}`} 
                    className="hover:text-gold transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-xl font-serif font-bold mb-4 text-gold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-gold transition">Home</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold transition">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter & Social */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-gold">Connect With Us</h3>
            <p className="mb-4">Follow us on social media to see our latest work and special offers.</p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gold/10 hover:bg-gold/20 p-3 rounded-full transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8">
              <form className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm">Subscribe to our newsletter</label>
                <div className="flex">
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none flex-grow"
                  />
                  <button 
                    type="submit" 
                    className="bg-gold text-charcoal px-4 py-2 rounded-r font-medium hover:bg-gold/90 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nihal Wanjari Wedding Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;