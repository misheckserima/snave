# Snave - Language Learning Platform

A comprehensive language learning platform with user registration, authentication, and progress tracking. Designed for deployment on Render with PostgreSQL database and Supabase integration.

## 🚀 Features

- **User Registration & Authentication**: Secure user registration with JWT-based authentication
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **PostgreSQL Database**: Robust data storage with proper schema design
- **RESTful API**: Well-structured Node.js/Express backend
- **Production Ready**: Configured for Render deployment

## 🛠 Tech Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js with Express
- PostgreSQL database (Render or Supabase)
- Supabase for authentication and database
- JWT authentication
- bcryptjs for password hashing
- Input validation and sanitization

## 🌐 Deployment Options

### Option 1: Render with PostgreSQL

#### Prerequisites
1. GitHub account with your code repository
2. Render account (free tier available)

### Option 2: Render with Supabase (Recommended)

#### Prerequisites
1. GitHub account with your code repository
2. Render account (free tier available)
3. Supabase account (free tier available)

For detailed instructions on migrating to Supabase, see the [Supabase Migration Guide](./SUPABASE_MIGRATION_GUIDE.md).

### Step-by-Step Deployment

#### 1. Database Setup
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: `lingualearner-db`
   - **Database**: `lingualearner`
   - **User**: `lingualearner_user`
   - **Plan**: Free
4. Click "Create Database"
5. Once created, go to the database dashboard and run the SQL from `server/database-init.sql` in the query console

#### 2. Backend API Deployment
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lingualearner-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:server`
   - **Plan**: Free
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: (Connect to your PostgreSQL database)
   - `JWT_SECRET`: (Generate a secure random string)
   - `PORT`: `10000` (Render's default)
5. Click "Create Web Service"

#### 3. Frontend Deployment
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lingualearner-frontend`
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: `https://lingualearner-api.onrender.com`
5. Click "Create Web Service"

### Alternative: Using render.yaml (Recommended)

1. Copy the `render.yaml` file to your repository root
2. Go to Render Dashboard → "New" → "Blueprint"
3. Connect your repository
4. Render will automatically create both services and database

## 🔧 Local Development

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher) or Supabase account
- npm or yarn

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/yourusername/snave.git
   cd snave
   npm install
   ```

2. **Database setup:**
   ```bash
   # Create local database
   createdb snave
   
   # Run initialization script
   psql -d snave -f server/database-init.sql
   ```

3. **Environment variables:**
   Create `.env.local`:
   
   For PostgreSQL:
    ```env
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/snave
    JWT_SECRET=lingualearner-secure-jwt-secret-for-production
    NODE_ENV=development
    PORT=10000
    ```
   
   For Supabase:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/snave
    JWT_SECRET=lingualearner-secure-jwt-secret-for-production
    NODE_ENV=development
    PORT=10000
    NEXT_PUBLIC_SUPABASE_URL=https://ayadhsrhvszkbvjouwoa.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YWRoc3JodnN6a2J2am91d29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDk1NDgsImV4cCI6MjA2ODk4NTU0OH0.JU8xl4B4Gi4x_UqJLa17P7pzS2yrkuUDm9dD56G03Yk
   ```

4. **Run development servers:**
   ```bash
   # Backend (terminal 1)
   npm run dev:server
   
   # Frontend (terminal 2)
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:10000
   - Health check: http://localhost:10000/health

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/stats` - Get user statistics (requires auth)

### Health Check
- `GET /health` - API health status
- `GET /` - API information

## 🗄 Database Schema

### Users Table
- `id` - Primary key (SERIAL)
- `name` - User's name
- `email` - Unique email address
- `password_hash` - Encrypted password (bcrypt)
- `created_at`, `updated_at` - Timestamps
- `is_active` - Account status

## 🔒 Security Features

- Password hashing with bcryptjs (12 salt rounds)
- JWT token-based authentication (7-day expiration)
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration for production
- Environment variable protection
- Rate limiting ready
- Secure headers

## 🚀 Production Considerations

### Environment Variables (Render with PostgreSQL)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=lingualearner-secure-jwt-secret-for-production
PORT=10000
NEXT_PUBLIC_API_URL=https://lingualearner-api.onrender.com
```

### Environment Variables (Render with Supabase)
```env
NODE_ENV=production
JWT_SECRET=lingualearner-secure-jwt-secret-for-production
PORT=10000
NEXT_PUBLIC_API_URL=https://lingualearner-api.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://ayadhsrhvszkbvjouwoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YWRoc3JodnN6a2J2am91d29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDk1NDgsImV4cCI6MjA2ODk4NTU0OH0.JU8xl4B4Gi4x_UqJLa17P7pzS2yrkuUDm9dD56G03Yk
SUPABASE_CONNECTION_STRING=postgresql://postgres:misheckserima2002@Gm@db.ayadhsrhvszkbvjouwoa.supabase.co:5432/postgres
```



### Performance Optimizations
- Database connection pooling
- Proper indexing on frequently queried columns
- Graceful shutdown handling
- Health check endpoints for monitoring
- Request logging (disabled in production for /health)

## 📊 Monitoring

- Health check endpoint: `/health`
- Database connection monitoring
- Error logging and handling
- Request logging (development only)

## 🔄 Future Enhancements

- [ ] Lesson management system
- [ ] Progress tracking and analytics
- [ ] Interactive exercises and quizzes
- [ ] Social features (friends, leaderboards)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language UI support
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL environment variable
   - Ensure PostgreSQL service is running
   - Verify database credentials

2. **CORS Errors**
   - Check NEXT_PUBLIC_API_URL matches your backend URL
   - Verify CORS configuration in server/app.js

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set and consistent
   - Check token expiration (7 days default)

4. **Build Failures on Render**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

### Support

For issues and questions:
1. Check the troubleshooting section above
2. Review Render deployment logs
3. Check database connection and queries
4. Verify environment variables are set correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Ready to deploy!** 🚀 Follow the deployment steps above to get your language learning platform live on Render.