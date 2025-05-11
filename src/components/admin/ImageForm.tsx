import React, { useState } from 'react';
import { GalleryImage } from '../../types';

interface ImageFormProps {
  categoryId: string;
  initialData?: GalleryImage;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ categoryId, initialData, onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState(initialData?.caption || '');
  const [previewUrl, setPreviewUrl] = useState(initialData?.url || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    formData.append('caption', caption);
    formData.append('categoryId', categoryId);
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Image File</label>
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
              alt="Preview" 
              className="h-40 object-contain rounded border border-gray-300" 
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy focus:ring-burgundy sm:text-sm"
          placeholder="Describe this image..."
        />
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
          {initialData ? 'Update Image' : 'Add Image'}
        </button>
      </div>
    </form>
  );
};

export default ImageForm;