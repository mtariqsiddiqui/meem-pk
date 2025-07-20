import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuthRequest } from '../types';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch users'
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch user'
      });
    }
  }

  static async updateUserRole(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['USER', 'ADMIN'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const user = await UserService.updateUserRole(id, role);
      res.json({
        message: 'User role updated successfully',
        user
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update user role'
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete user'
      });
    }
  }
}