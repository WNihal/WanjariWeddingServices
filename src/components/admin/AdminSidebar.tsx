import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, Flower, Camera, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { services } = useData();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'Flower':
        return <Flower className="h-5 w-5" />;
      case 'Camera':
        return <Camera className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <aside className="bg-white w-64 border-r border-gray-200 flex-shrink-0 h-screen sticky top-0">
      <div className="py-6 px-4">
        <h2 className="text-lg font-bold text-gray-800 font-serif mb-6">Dashboard</h2>
        
        <nav className="space-y-1">
          <Link 
            to="/admin"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              isActive('/admin') 
                ? 'bg-burgundy/10 text-burgundy' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Services
            </p>
          </div>
          
          <Link 
            to="/admin/services"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              isActive('/admin/services') 
                ? 'bg-burgundy/10 text-burgundy' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Manage Services
          </Link>
          
          {services.map((service) => (
            <Link 
              key={service.id}
              to={`/admin/categories/${service.id}`}
              className={`flex items-center px-4 py-2.5 pl-10 text-sm font-medium rounded-md ${
                location.pathname === `/admin/categories/${service.id}` 
                  ? 'bg-burgundy/10 text-burgundy' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {getServiceIcon(service.icon)}
              <span className="ml-3">{service.name}</span>
            </Link>
          ))}

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Communication
            </p>
          </div>

          <Link 
            to="/admin/contacts"
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              isActive('/admin/contacts') 
                ? 'bg-burgundy/10 text-burgundy' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Mail className="mr-3 h-5 w-5" />
            Contact Messages
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;