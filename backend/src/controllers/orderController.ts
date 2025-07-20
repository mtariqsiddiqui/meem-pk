import { Response } from 'express';
import { OrderService } from '../services/orderService';
import { AuthRequest } from '../types';

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json({
        message: 'Order created successfully',
        order
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to create order'
      });
    }
  }

  static async getUserOrders(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const orders = await OrderService.getUserOrders(req.user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch orders'
      });
    }
  }

  static async getOrderById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.role === 'ADMIN' ? undefined : req.user?.id;
      
      const order = await OrderService.getOrderById(id, userId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch order'
      });
    }
  }

  static async getAllOrders(req: AuthRequest, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch orders'
      });
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await OrderService.updateOrderStatus(id, status);
      res.json({
        message: 'Order status updated',
        order
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update order status'
      });
    }
  }
}