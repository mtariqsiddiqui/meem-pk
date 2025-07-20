export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  sizes: string[];
  colors: string[];
  featured: boolean;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  size?: string;
  color?: string;
  productId: string;
  product: Product;
  userId: string;
}

export interface Order {
  id: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  product: Product;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
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

export interface PaginatedResponse<T> {
  products: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}