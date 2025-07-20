import { Category } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { CreateCategoryDto } from '../types';

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  static async createCategory(data: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({
      data
    });
  }

  static async updateCategory(
    id: string, 
    data: Partial<CreateCategoryDto>
  ): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data
    });
  }

  static async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id }
    });
  }
}