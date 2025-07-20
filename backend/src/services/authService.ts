import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export class AuthService {
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await hashPassword(userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });

    const token = generateToken(user);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  static async login(email: string, password: string): Promise<{
    user: Omit<User, 'password'>;
    token: string;
  }> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  static async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}