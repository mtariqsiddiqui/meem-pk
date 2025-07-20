import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  categoryId: z.string().min(1, 'Category is required'),
  featured: z.boolean().optional()
});

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
  image: z.string().url().optional()
});

export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  size: z.string().optional(),
  color: z.string().optional()
});

export const createOrderSchema = z.object({
  shippingAddress: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone is required')
  }),
  paymentMethod: z.string().min(1, 'Payment method is required')
});