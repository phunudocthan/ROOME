# ROOME

A comprehensive room booking and management system built with modern web technologies.

## 👥 Team Members

1. Member 1 - [GitHub Profile]
2. Member 2 - [GitHub Profile]
3. Member 3 - [GitHub Profile]
4. Member 4 - [GitHub Profile]
5. Member 5 - [GitHub Profile]

## 🚀 Technology Stack

### Frontend (Client)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT
- **Validation**: Zod / Joi
- **API Documentation**: Swagger

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git
- **Containerization**: Docker

## 📁 Project Structure

```
ROOME/
├── client/                 # Next.js frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # Reusable React components
│   │   ├── lib/          # Utility functions and configurations
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service calls
│   │   ├── types/        # TypeScript type definitions
│   │   └── styles/       # Global styles
│   ├── package.json
│   └── tsconfig.json
│
├── server/                # Express.js backend application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middlewares/  # Express middlewares
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   ├── types/        # TypeScript type definitions
│   │   └── index.ts      # Application entry point
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                  # Documentation
├── docker-compose.yml     # Docker compose configuration
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account
- Git

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/phunudocthan/ROOME.git
cd ROOME
```

### 2. Install dependencies

#### Install client dependencies
```bash
cd client
npm install
```

#### Install server dependencies
```bash
cd ../server
npm install
```

### 3. Environment Setup

#### Client (.env.local)
```bash
cd client
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### Server (.env)
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Running the Application

### Development Mode

#### Run both client and server
```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm run dev
```

#### Using Docker (Recommended)
```bash
docker-compose up
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 🧪 Testing

### Run tests for client
```bash
cd client
npm test
```

### Run tests for server
```bash
cd server
npm test
```

## 📝 Code Standards

### Linting
```bash
# Client
cd client
npm run lint

# Server
cd server
npm run lint
```

### Formatting
```bash
# Format all files
npm run format
```

## 🔧 Build for Production

### Client
```bash
cd client
npm run build
npm start
```

### Server
```bash
cd server
npm run build
npm start
```

## 📚 Documentation

Detailed documentation can be found in the `/docs` directory:
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Project Link: [https://github.com/phunudocthan/ROOME](https://github.com/phunudocthan/ROOME)

---

**Note**: This is a graduation project developed by a team of 5 members.