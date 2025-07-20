import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ProductFilters } from '../types';

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const filters: ProductFilters = {
        category: req.query.category as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        search: req.query.search as string,
        featured: req.query.featured === 'true',
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
        sortBy: req.query.sortBy as 'price' | 'name' | 'createdAt',
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      };

      const result = await ProductService.getAllProducts(filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch products'
      });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch product'
      });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to create product'
      });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      
      res.json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update product'
      });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete product'
      });
    }
  }

  static async getFeaturedProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch featured products'
      });
    }
  }
}