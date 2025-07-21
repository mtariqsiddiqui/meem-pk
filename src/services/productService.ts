import { api } from '../utils/api';
import { Product, ProductFilters, PaginatedResponse } from '../types';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return api.get<PaginatedResponse<Product>>(endpoint);
  },

  async getProduct(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return api.get<Product[]>('/products/featured');
  },

  async createProduct(productData: any): Promise<{ product: Product; message: string }> {
    return api.post<{ product: Product; message: string }>('/products', productData);
  },

  async updateProduct(id: string, productData: any): Promise<{ product: Product; message: string }> {
    return api.put<{ product: Product; message: string }>(`/products/${id}`, productData);
  },

  async deleteProduct(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`/products/${id}`);
  }
};