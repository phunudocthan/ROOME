# ⚡ Quick Start Guide - ROOME

## 🚀 Khởi Động Nhanh (5 phút)

### 1. Install Dependencies
```bash
cd /Users/maxwell/FPTu_Muon_Nam/ROOME/ROOME

# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 2. Configure Environment

**Client**: `client/.env`
```env
VITE_API_URL=http://localhost:8080/api
```

**Server**: `server/.env`
```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/roome
PORT=8080
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Run Frontend ✅ WORKS
```bash
cd client
npm run dev
```
→ Open http://localhost:5173

### 4. Run Backend ⚠️ Workaround
```bash
cd server
npm run build
npm start
```
→ API: http://localhost:8080/api

## 🔍 Test It

### Frontend
- Open browser: http://localhost:5173
- Should see "Welcome to ROOME" page

### Backend
```bash
curl http://localhost:8080/api/users
```
Should return empty array or users list

## ❗ Known Issue

`npm run start:dev` trong server không hoạt động do path config.

**Workaround**: Dùng `npm run build && npm start` thay thế.

## 📚 More Info

- Full README: [../README.md](../README.md)
- Setup Summary: [./SETUP_SUMMARY.md](./SETUP_SUMMARY.md)
- Architecture: [./architecture.md](./architecture.md)
- AI Instructions: [../.github/copilot-instructions.md](../.github/copilot-instructions.md)
