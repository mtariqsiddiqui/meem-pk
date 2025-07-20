# E-commerce Platform

A full-stack e-commerce platform built with React, TypeScript, Express.js, and PostgreSQL.

## 🚀 Features

### Frontend
- Product catalog with filtering and search
- Shopping cart and checkout process
- User authentication and account management
- Admin dashboard for store management
- Responsive design with Tailwind CSS

### Backend
- RESTful API with Express.js and TypeScript
- JWT-based authentication
- PostgreSQL database with Prisma ORM
- Role-based access control
- Input validation with Zod

## 📁 Project Structure

```
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── routes/        # API route definitions
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── prisma/            # Database schema and migrations
│   └── .env.example       # Environment variables template
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and JWT secret.

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Seed the database (optional):
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
```

## 📊 Database Schema

The application uses the following main entities:
- **Users** - Customer and admin accounts
- **Products** - Store inventory with variants
- **Categories** - Product categorization
- **Cart** - Shopping cart items
- **Orders** - Purchase records
- **OrderItems** - Individual order line items

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## 🚀 Deployment

### Backend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Run database migrations on production:
   ```bash
   npx prisma migrate deploy
   ```

3. Start the production server:
   ```bash
   npm start
   ```

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.