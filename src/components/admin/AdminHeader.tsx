import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-charcoal text-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/admin" className="flex items-center">
            <span className="text-gold font-serif text-xl font-bold mr-2">NW</span>
            <span>Admin Panel</span>
          </Link>
          
          <div className="flex items-center">
            <div className="mr-6 flex items-center">
              <User className="h-5 w-5 text-gold mr-2" />
              <span className="hidden sm:inline">Admin</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center bg-burgundy/90 hover:bg-burgundy px-3 py-1.5 rounded text-sm transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;