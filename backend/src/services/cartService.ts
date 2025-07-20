import { CartItem } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { AddToCartDto, UpdateCartItemDto } from '../types';

export class CartService {
  static async getCart(userId: string) {
    return prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { category: true }
        }
      }
    });
  }

  static async addToCart(userId: string, data: AddToCartDto): Promise<CartItem> {
    const { productId, quantity, size, color } = data;

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId_size_color: {
          userId,
          productId,
          size: size || '',
          color: color || ''
        }
      }
    });

    if (existingItem) {
      // Update quantity if item exists
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: {
            include: { category: true }
          }
        }
      });
    }

    // Create new cart item
    return prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
        size,
        color
      },
      include: {
        product: {
          include: { category: true }
        }
      }
    });
  }

  static async updateCartItem(
    id: string,
    userId: string,
    data: UpdateCartItemDto
  ): Promise<CartItem> {
    return prisma.cartItem.update({
      where: {
        id,
        userId // Ensure user can only update their own cart items
      },
      data,
      include: {
        product: {
          include: { category: true }
        }
      }
    });
  }

  static async removeFromCart(id: string, userId: string): Promise<void> {
    await prisma.cartItem.delete({
      where: {
        id,
        userId // Ensure user can only delete their own cart items
      }
    });
  }

  static async clearCart(userId: string): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { userId }
    });
  }
}