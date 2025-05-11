import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { services } = useData();
  const location = useLocation();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-burgundy' : 'text-white'}`}>
              Wanjari Wedding Services
            </span>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button 
                className={`flex items-center font-medium transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
                }`}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white shadow-lg rounded-md overflow-hidden">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium py-2 transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
                }`}
              >
                Home
              </Link>
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className={`font-medium py-2 transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
                  }`}
                >
                  {service.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className={`font-medium py-2 transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-burgundy' : 'text-white hover:text-gold'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;