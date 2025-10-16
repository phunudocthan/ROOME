# Deployment Guide

This guide covers deploying the ROOME application to production environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Git
- Domain name (optional)
- Hosting provider account (Vercel, Heroku, DigitalOcean, etc.)

---

## Environment Setup

### Production Environment Variables

#### Backend (.env)
```bash
NODE_ENV=production
PORT=5000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roome?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-secret-key-min-32-characters
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NEXT_PUBLIC_APP_NAME=ROOME
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com
```

---

## Database Setup

### MongoDB Atlas

1. **Create Production Cluster**
   - Log in to MongoDB Atlas
   - Create a new production-tier cluster
   - Choose appropriate region for your users

2. **Configure Database Access**
   - Create a database user with strong password
   - Save credentials securely

3. **Configure Network Access**
   - For production, whitelist specific IP addresses
   - Or use VPC peering for better security

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

5. **Create Database and Collections**
   ```javascript
   // Collections are automatically created by Mongoose
   // Ensure indexes are created properly
   ```

---

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd server
   heroku create roome-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set CORS_ORIGIN="your-frontend-url"
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 2: DigitalOcean App Platform

1. Create a new app in DigitalOcean
2. Connect your GitHub repository
3. Set environment variables in the dashboard
4. Configure build and run commands:
   - Build: `npm install && npm run build`
   - Run: `npm start`

### Option 3: VPS (Ubuntu)

1. **SSH into your server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/phunudocthan/ROOME.git
   cd ROOME/server
   npm install
   npm run build
   ```

5. **Create .env file**
   ```bash
   nano .env
   # Add your environment variables
   ```

6. **Start with PM2**
   ```bash
   pm2 start dist/index.js --name roome-api
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd client
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add your production environment variables

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   cd client
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: VPS with PM2

1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Start with PM2**
   ```bash
   pm2 start npm --name "roome-client" -- start
   pm2 save
   ```

3. **Setup Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Docker Deployment

### Build and Run with Docker Compose

1. **Update docker-compose.yml for production**
   ```yaml
   # Use environment files for production
   # Remove volume mounts for code
   # Add restart policies
   ```

2. **Build images**
   ```bash
   docker-compose build
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

### Deploy to Docker Hub

1. **Build and tag images**
   ```bash
   docker build -t yourusername/roome-server:latest ./server
   docker build -t yourusername/roome-client:latest ./client
   ```

2. **Push to Docker Hub**
   ```bash
   docker push yourusername/roome-server:latest
   docker push yourusername/roome-client:latest
   ```

---

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Monitoring & Maintenance

### Health Checks

- Backend: `GET https://your-api.com/health`
- Frontend: Check if the site loads properly

### Logging

**Backend with PM2:**
```bash
pm2 logs roome-api
```

**View error logs:**
```bash
pm2 logs roome-api --err
```

### Performance Monitoring

Consider using:
- **New Relic** - Application performance monitoring
- **Datadog** - Infrastructure and application monitoring
- **Sentry** - Error tracking
- **LogRocket** - Frontend monitoring

### Backup Strategy

1. **Database Backups**
   - MongoDB Atlas provides automated backups
   - Configure backup schedule in Atlas dashboard

2. **Code Backups**
   - Keep code in Git repository
   - Tag releases: `git tag -a v1.0.0 -m "Release version 1.0.0"`

### Security Best Practices

1. Keep dependencies updated: `npm audit fix`
2. Use environment variables for sensitive data
3. Enable HTTPS/SSL
4. Set up firewall rules
5. Regular security audits
6. Implement rate limiting
7. Use strong JWT secrets
8. Sanitize user inputs
9. Regular database backups
10. Monitor for suspicious activities

### Scaling

**Horizontal Scaling:**
- Use load balancers (AWS ELB, Nginx)
- Deploy multiple instances
- Use Redis for session management

**Vertical Scaling:**
- Upgrade server resources
- Optimize database queries
- Implement caching (Redis/Memcached)

### CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/ROOME
            git pull
            cd server && npm install && npm run build
            cd ../client && npm install && npm run build
            pm2 restart all
```

---

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   lsof -i :5000
   kill -9 <PID>
   ```

2. **MongoDB connection failed**
   - Check connection string
   - Verify IP whitelist in Atlas
   - Check credentials

3. **Environment variables not loaded**
   - Verify .env file exists
   - Check file permissions
   - Restart the application

4. **Build failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `rm -rf .next dist`

---

## Support

For deployment issues, contact the development team or refer to the main README.md.
