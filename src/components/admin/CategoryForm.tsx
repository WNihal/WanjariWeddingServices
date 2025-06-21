import React, { useState } from 'react';
import { Category } from '../../types';

interface CategoryFormProps {
  serviceId: string;
  initialData?: Category;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ serviceId, initialData, onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.thumbnail || '');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    submitData.append('serviceId', serviceId);
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy focus:ring-burgundy sm:text-sm"
          placeholder="e.g., Vegetarian"
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
          placeholder="Describe the category..."
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
          {initialData ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;