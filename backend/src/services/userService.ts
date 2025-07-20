import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';

export class UserService {
  static async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async updateUserRole(id: string, role: 'USER' | 'ADMIN') {
    return prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}