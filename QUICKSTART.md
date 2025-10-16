# 🚀 ROOME - Quick Start Guide

Get up and running with ROOME in less than 5 minutes!

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ npm 9+ (comes with Node.js)
- ✅ Git installed
- ✅ MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- ✅ A code editor (VS Code recommended)

## 🎯 Quick Setup (5 Minutes)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/phunudocthan/ROOME.git
cd ROOME
```

### 2️⃣ Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new cluster (Free M0 Sandbox tier is perfect for development)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://...`)

### 3️⃣ Configure Backend

```bash
cd server

# Copy environment template
cp .env.example .env

# Edit .env and add your MongoDB connection string
# You can use nano, vim, or your preferred editor
nano .env
```

Update these values in `.env`:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roome?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

```bash
# Install dependencies
npm install
```

### 4️⃣ Configure Frontend

```bash
cd ../client

# Copy environment template
cp .env.example .env.local

# No changes needed for local development
# The default values will work with the server on localhost:5000

# Install dependencies
npm install
```

### 5️⃣ Start Development Servers

Open **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

You should see:
```
Server is running on port 5000 in development mode
MongoDB Connected: cluster0-xxx.mongodb.net
```

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

### 6️⃣ Open Your Browser

Navigate to: **http://localhost:3000**

You should see the ROOME welcome page! 🎉

---

## 📝 What You Get Out of the Box

### Backend (Server)
- ✅ Express.js API server
- ✅ MongoDB connection
- ✅ JWT authentication system
- ✅ User, Room, and Booking models
- ✅ RESTful API endpoints
- ✅ Error handling and validation
- ✅ Rate limiting
- ✅ Security middleware (Helmet, CORS, etc.)

### Frontend (Client)
- ✅ Next.js 14 with App Router
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Axios API client
- ✅ Example components
- ✅ Custom hooks
- ✅ Service layer

---

## 🧪 Test the API

### Check Server Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🎨 Project Structure Overview

```
ROOME/
├── client/              # Frontend (Next.js)
│   ├── src/
│   │   ├── app/        # Pages (App Router)
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom hooks
│   │   ├── lib/        # Utilities
│   │   ├── services/   # API calls
│   │   └── types/      # TypeScript types
│   └── package.json
│
├── server/             # Backend (Express)
│   ├── src/
│   │   ├── config/     # Configuration
│   │   ├── controllers/# Route handlers
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   ├── middlewares/# Express middlewares
│   │   └── index.ts    # Entry point
│   └── package.json
│
└── docs/              # Documentation
    ├── API.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    └── CONTRIBUTING.md
```

---

## 🛠️ Common Commands

### Backend (Server)
```bash
cd server

npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm test           # Run tests
```

### Frontend (Client)
```bash
cd client

npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

---

## 🐳 Using Docker (Optional)

If you prefer Docker:

```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

---

## 📚 Next Steps

1. **Read the Documentation**
   - [API Documentation](./docs/API.md) - Learn about available endpoints
   - [Database Schema](./docs/DATABASE.md) - Understand the data models
   - [Contributing Guide](./docs/CONTRIBUTING.md) - Development workflow

2. **Explore the Code**
   - Check out `server/src/routes/` for API endpoints
   - Look at `client/src/app/` for pages
   - Review `server/src/models/` for database models

3. **Start Building**
   - Create new pages in `client/src/app/`
   - Add API endpoints in `server/src/routes/`
   - Design new components in `client/src/components/`

---

## 🆘 Troubleshooting

### Server won't start

**Problem:** Port 5000 is already in use
```bash
# Solution: Kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change the port in server/.env
PORT=5001
```

**Problem:** MongoDB connection failed
- Verify your connection string in `server/.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure credentials are correct

### Client won't start

**Problem:** Port 3000 is already in use
```bash
# Solution: Kill the process
lsof -ti:3000 | xargs kill -9

# Or Next.js will prompt you to use a different port
```

**Problem:** Module not found errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Can't connect to API from client

**Problem:** API requests failing
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `client/.env.local`
- Verify CORS settings in `server/src/index.ts`

---

## 💡 Tips for Team Development

1. **Create Feature Branches**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Pull Latest Changes Regularly**
   ```bash
   git pull origin main
   ```

3. **Use Consistent Code Style**
   - Run `npm run format` before committing
   - Run `npm run lint` to check for errors

4. **Write Meaningful Commits**
   ```bash
   git commit -m "feat(client): add user profile page"
   git commit -m "fix(server): resolve authentication bug"
   ```

5. **Test Before Pushing**
   - Ensure the app runs without errors
   - Test your changes thoroughly
   - Run linters and formatters

---

## 📧 Need Help?

- Check the [Contributing Guide](./docs/CONTRIBUTING.md)
- Review [API Documentation](./docs/API.md)
- Ask your team members
- Create an issue on GitHub

---

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### MongoDB
- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy Coding! 🚀**

Remember: This is your graduation project. Take your time to understand the codebase, experiment with new features, and build something amazing!
