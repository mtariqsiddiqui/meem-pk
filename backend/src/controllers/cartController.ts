import { Response } from 'express';
import { CartService } from '../services/cartService';
import { AuthRequest } from '../types';

export class CartController {
  static async getCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const cartItems = await CartService.getCart(req.user.id);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch cart'
      });
    }
  }

  static async addToCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const cartItem = await CartService.addToCart(req.user.id, req.body);
      res.status(201).json({
        message: 'Item added to cart',
        cartItem
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to add item to cart'
      });
    }
  }

  static async updateCartItem(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { id } = req.params;
      const cartItem = await CartService.updateCartItem(id, req.user.id, req.body);
      
      res.json({
        message: 'Cart item updated',
        cartItem
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update cart item'
      });
    }
  }

  static async removeFromCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const { id } = req.params;
      await CartService.removeFromCart(id, req.user.id);
      
      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to remove item from cart'
      });
    }
  }

  static async clearCart(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      await CartService.clearCart(req.user.id);
      res.json({ message: 'Cart cleared' });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to clear cart'
      });
    }
  }
}