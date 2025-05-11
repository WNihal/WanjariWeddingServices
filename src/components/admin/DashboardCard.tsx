import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon, color, link }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${color}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="p-3 rounded-full bg-gray-100">{icon}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{count}</p>
            <p className="text-sm text-gray-500 mt-1">Total {title.toLowerCase()}</p>
          </div>
          <Link 
            to={link} 
            className="text-burgundy hover:text-burgundy/80 inline-flex items-center text-sm font-medium"
          >
            Manage <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;