import { Order } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { CreateOrderDto } from '../types';

export class OrderService {
  static async createOrder(userId: string, data: CreateOrderDto): Promise<Order> {
    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod
        }
      });

      // Create order items
      await tx.orderItem.createMany({
        data: cartItems.map(item => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color
        }))
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    return prisma.order.findUniqueOrThrow({
      where: { id: order.id },
      include: {
        orderItems: {
          include: { product: true }
        }
      }
    });
  }

  static async getUserOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getOrderById(id: string, userId?: string) {
    const where: any = { id };
    if (userId) {
      where.userId = userId;
    }

    return prisma.order.findUnique({
      where,
      include: {
        orderItems: {
          include: { product: true }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  static async getAllOrders() {
    return prisma.order.findMany({
      include: {
        orderItems: {
          include: { product: true }
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateOrderStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status: status as any },
      include: {
        orderItems: {
          include: { product: true }
        }
      }
    });
  }
}