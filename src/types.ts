export interface Service {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  icon: string;
}

export interface Category {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  thumbnail: string;
}

export interface GalleryImage {
  id: string;
  categoryId: string;
  url: string;
  caption: string;
}