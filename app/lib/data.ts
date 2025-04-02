import productsData from '../dev-data/products.json';
import { Product } from '../types/product';
import { Analytics } from '../types/analytics';

export const getProducts = (): Product[] => {
  return productsData.products;
};

export const getAnalytics = (): Analytics => {
  return productsData.analytics;
};

export const getProductById = (id: string): Product | undefined => {
  return productsData.products.find(product => product._id === id);
};

export const getBrandProducts = (brand: string): Product[] => {
  return productsData.products.filter(product => product.Brand === brand);
};

// This function simulates what would be a MongoDB query
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return productsData.products.filter(product => 
    product.Title.toLowerCase().includes(searchTerm) ||
    product.Description.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
};
