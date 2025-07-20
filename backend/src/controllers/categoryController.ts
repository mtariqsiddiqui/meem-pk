import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch categories'
      });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch category'
      });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json({
        message: 'Category created successfully',
        category
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to create category'
      });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(id, req.body);
      
      res.json({
        message: 'Category updated successfully',
        category
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to update category'
      });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Failed to delete category'
      });
    }
  }
}