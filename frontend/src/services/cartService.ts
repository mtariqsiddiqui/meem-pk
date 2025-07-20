import { api } from '../utils/api';
import { CartItem } from '../types';

export interface AddToCartData {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    return api.get<CartItem[]>('/cart');
  },

  async addToCart(data: AddToCartData): Promise<{ cartItem: CartItem; message: string }> {
    return api.post<{ cartItem: CartItem; message: string }>('/cart', data);
  },

  async updateCartItem(id: string, quantity: number): Promise<{ cartItem: CartItem; message: string }> {
    return api.put<{ cartItem: CartItem; message: string }>(`/cart/${id}`, { quantity });
  },

  async removeFromCart(id: string): Promise<{ message: string }> {
    return api.delete<{ message: string }>(`/cart/${id}`);
  },

  async clearCart(): Promise<{ message: string }> {
    return api.delete<{ message: string }>('/cart');
  }
};