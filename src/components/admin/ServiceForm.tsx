import React, { useState } from 'react';
import { Service } from '../../types';
import { UtensilsCrossed, Flower, Camera } from 'lucide-react';

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.thumbnail || '');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'UtensilsCrossed',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    if (selectedFile) {
      submitData.append('file', selectedFile);
    }
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('icon', formData.icon);
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy focus:ring-burgundy sm:text-sm"
          placeholder="e.g., Catering Services"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy focus:ring-burgundy sm:text-sm"
          placeholder="Describe the service..."
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          required={!initialData}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-burgundy file:text-white
            hover:file:bg-burgundy/90"
        />
        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img 
              src={previewUrl} 
              alt="Thumbnail Preview" 
              className="h-20 w-32 object-cover rounded border border-gray-300" 
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon</label>
        <div className="mt-1 flex space-x-3">
          <label className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${formData.icon === 'UtensilsCrossed' ? 'border-burgundy bg-burgundy/10' : 'border-gray-300 hover:bg-gray-50'}`}>
            <input 
              type="radio" 
              name="icon" 
              value="UtensilsCrossed" 
              checked={formData.icon === 'UtensilsCrossed'} 
              onChange={handleChange} 
              className="sr-only" 
            />
            <UtensilsCrossed className={`h-6 w-6 ${formData.icon === 'UtensilsCrossed' ? 'text-burgundy' : 'text-gray-500'}`} />
          </label>
          <label className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${formData.icon === 'Flower' ? 'border-burgundy bg-burgundy/10' : 'border-gray-300 hover:bg-gray-50'}`}>
            <input 
              type="radio" 
              name="icon" 
              value="Flower" 
              checked={formData.icon === 'Flower'} 
              onChange={handleChange} 
              className="sr-only" 
            />
            <Flower className={`h-6 w-6 ${formData.icon === 'Flower' ? 'text-burgundy' : 'text-gray-500'}`} />
          </label>
          <label className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${formData.icon === 'Camera' ? 'border-burgundy bg-burgundy/10' : 'border-gray-300 hover:bg-gray-50'}`}>
            <input 
              type="radio" 
              name="icon" 
              value="Camera" 
              checked={formData.icon === 'Camera'} 
              onChange={handleChange} 
              className="sr-only" 
            />
            <Camera className={`h-6 w-6 ${formData.icon === 'Camera' ? 'text-burgundy' : 'text-gray-500'}`} />
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy hover:bg-burgundy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy"
        >
          {initialData ? 'Update Service' : 'Add Service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;