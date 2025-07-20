import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../types';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName
      });

      res.status(201).json({
        message: 'User registered successfully',
        ...result
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const result = await AuthService.login(email, password);

      res.json({
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      res.status(401).json({
        message: error instanceof Error ? error.message : 'Login failed'
      });
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const user = await AuthService.getProfile(req.user.id);
      res.json({ user });
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : 'User not found'
      });
    }
  }
}