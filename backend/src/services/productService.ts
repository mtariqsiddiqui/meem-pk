import { Product } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { CreateProductDto, UpdateProductDto, ProductFilters } from '../types';

export class ProductService {
  static async getAllProducts(filters: ProductFilters = {}) {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      featured,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = filters;

    const where: any = {};

    if (category) {
      where.category = { name: { contains: category, mode: 'insensitive' } };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  static async createProduct(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({
      data,
      include: { category: true }
    });
  }

  static async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true }
    });
  }

  static async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id }
    });
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8
    });
  }
}