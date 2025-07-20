import { Request } from 'express';
import { User } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: User;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  sizes: string[];
  colors: string[];
  categoryId: string;
  featured?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  stock?: number;
  sizes?: string[];
  colors?: string[];
  categoryId?: string;
  featured?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CreateOrderDto {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}