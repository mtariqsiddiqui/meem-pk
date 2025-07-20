import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  // Create regular user
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER'
    }
  });

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
    }
  });

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: {
      name: 'Clothing',
      description: 'Fashion and apparel',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
    }
  });

  const home = await prisma.category.upsert({
    where: { name: 'Home & Garden' },
    update: {},
    create: {
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies',
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
    }
  });

  // Create products
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      images: [
        'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg',
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
      ],
      stock: 50,
      sizes: [],
      colors: ['Black', 'White', 'Silver'],
      categoryId: electronics.id,
      featured: true
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring',
      price: 299.99,
      images: [
        'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
        'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg'
      ],
      stock: 30,
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['Black', 'Silver', 'Gold'],
      categoryId: electronics.id,
      featured: true
    },
    {
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt, perfect for everyday wear',
      price: 29.99,
      images: [
        'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg',
        'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
      ],
      stock: 100,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
      categoryId: clothing.id,
      featured: false
    },
    {
      name: 'Designer Jeans',
      description: 'Premium denim jeans with perfect fit and style',
      price: 89.99,
      images: [
        'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg',
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
      ],
      stock: 75,
      sizes: ['28', '30', '32', '34', '36', '38', '40'],
      colors: ['Blue', 'Black', 'Light Blue'],
      categoryId: clothing.id,
      featured: true
    },
    {
      name: 'Indoor Plant Set',
      description: 'Beautiful set of indoor plants to brighten your home',
      price: 49.99,
      images: [
        'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
        'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg'
      ],
      stock: 25,
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['Green'],
      categoryId: home.id,
      featured: true
    },
    {
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable settings',
      price: 129.99,
      images: [
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg'
      ],
      stock: 40,
      sizes: [],
      colors: ['Black', 'Silver'],
      categoryId: home.id,
      featured: false
    }
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: { name: productData.name },
      update: {},
      create: productData
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Admin user: admin@ecommerce.com / admin123`);
  console.log(`👤 Regular user: user@example.com / user123`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });