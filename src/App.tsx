import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import CategoryDetailPage from './pages/public/CategoryDetailPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ServicesManagePage from './pages/admin/ServicesManagePage';
import CategoriesManagePage from './pages/admin/CategoriesManagePage';
import GalleryManagePage from './pages/admin/GalleryManagePage';
import ContactsManagePage from './pages/admin/ContactsManagePage';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services/:serviceId" element={<ServiceDetailPage />} />
              <Route path="services/:serviceId/:categoryId" element={<CategoryDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="services" element={<ServicesManagePage />} />
              <Route path="categories/:serviceId" element={<CategoriesManagePage />} />
              <Route path="gallery/:categoryId" element={<GalleryManagePage />} />
              <Route path="contacts" element={<ContactsManagePage />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;