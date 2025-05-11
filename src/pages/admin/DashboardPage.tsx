import React from 'react';
import { useData } from '../../contexts/DataContext';
import DashboardCard from '../../components/admin/DashboardCard';
import StatCard from '../../components/admin/StatCard';
import { UtensilsCrossed, Flower, Camera, Users, Calendar, ImageIcon } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { services, categories, images } = useData();
  
  // Calculate stats
  const totalServices = services.length;
  const totalCategories = categories.length;
  const totalImages = images.length;
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the wedding services admin panel</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Services" 
          count={totalServices} 
          icon={<svg className="h-5 w-5 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>} 
          color="border-burgundy" 
          link="/admin/services" 
        />
        <DashboardCard 
          title="Categories" 
          count={totalCategories} 
          icon={<svg className="h-5 w-5 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.24 2H16.76C20.0 2 22 4 22 7.24V16.76C22 20 20 22 16.76 22H7.24C4 22 2 20 2 16.76V7.24C2 4 4 4 7.24 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 16.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 16.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>} 
          color="border-gold" 
          link="/admin/services" 
        />
        <DashboardCard 
          title="Images" 
          count={totalImages} 
          icon={<ImageIcon className="h-5 w-5 text-burgundy" />} 
          color="border-burgundy" 
          link="/admin/services" 
        />
      </div>
      
      {/* Recent Activity/Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service) => {
            const serviceCategories = categories.filter(c => c.serviceId === service.id).length;
            const serviceImages = images.filter(img => 
              categories.some(cat => cat.serviceId === service.id && cat.id === img.categoryId)
            ).length;
            
            let icon;
            switch (service.icon) {
              case 'UtensilsCrossed':
                icon = <UtensilsCrossed className="h-5 w-5 text-burgundy" />;
                break;
              case 'Flower':
                icon = <Flower className="h-5 w-5 text-burgundy" />;
                break;
              case 'Camera':
                icon = <Camera className="h-5 w-5 text-burgundy" />;
                break;
              default:
                icon = null;
            }
            
            return (
              <StatCard 
                key={service.id}
                title={service.name}
                value={`${serviceCategories} Categories | ${serviceImages} Images`}
                icon={icon}
                color="text-burgundy"
              />
            );
          })}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/admin/services" 
            className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center transition-colors"
          >
            <div className="p-2 bg-burgundy/10 rounded-full mr-3">
              <svg className="h-5 w-5 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-medium">Add Service</span>
          </a>
          
          <a 
            href="/admin/services" 
            className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center transition-colors"
          >
            <div className="p-2 bg-burgundy/10 rounded-full mr-3">
              <svg className="h-5 w-5 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-medium">Add Category</span>
          </a>
          
          <a 
            href="/admin/services" 
            className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center transition-colors"
          >
            <div className="p-2 bg-burgundy/10 rounded-full mr-3">
              <ImageIcon className="h-5 w-5 text-burgundy" />
            </div>
            <span className="font-medium">Upload Images</span>
          </a>
          
          <a 
            href="/admin/services" 
            className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center transition-colors"
          >
            <div className="p-2 bg-burgundy/10 rounded-full mr-3">
              <svg className="h-5 w-5 text-burgundy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-medium">View Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;