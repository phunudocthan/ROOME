# 🧭 Copilot Initialization Guide for ROOME

## Purpose

This file defines how AI coding agents (e.g., GitHub Copilot CLI / Agents / Workspace) should **initialize and maintain** this repository.  
The project is a **graduation-level fullstack monorepo** using **React + NestJS + MongoDB Atlas + TypeScript**, designed for 5 team members.

---

## 🧱 Tech Stack Summary

| Layer           | Technology                            | Notes                                       |
| --------------- | ------------------------------------- | ------------------------------------------- |
| Frontend        | React 18 + TypeScript + Vite          | Clean modular structure, strict mode        |
| Backend         | NestJS 10 + TypeScript                | REST API + Mongoose ODM                     |
| Database        | MongoDB Atlas                         | Connection managed qua biến môi trường      |
| Package Manager | Yarn (workspaces)                     | Chạy `yarn` tại thư mục gốc                 |
| Node.js Version | ≥ 22.x                                | Required globally                           |
| Ports           | Frontend: **5173**, Backend: **8080** | Tránh xung đột trên macOS/Linux/Windows     |

---

## 📁 Monorepo Structure

```
ROOME/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── routes/
│   │   ├── services/           # Axios instances & API wrappers
│   │   ├── types/
│   │   └── main.tsx
│   ├── public/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   └── package.json
│
├── server/                     # NestJS backend
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── modules/
│   │   │   ├── user/
│   │   │   ├── auth/
│   │   │   └── room/
│   │   └── config/
│   │       ├── database.config.ts
│   │       └── env.config.ts
│   ├── test/
│   ├── tsconfig.json
│   ├── .env.example
│   └── package.json
│
├── docs/                       # Documentation, UML diagrams, etc.
│   └── architecture.md
│
├── .github/
│   └── workflows/
│       └── ci.yml              # Lint + build + test pipeline
│
├── .gitignore
├── README.md
├── package.json                # Root-level convenience scripts
├── tsconfig.base.json
└── yarn.lock
```

---

## ⚙️ Configuration Standards

### Root `package.json` scripts

```json
{
  "scripts": {
    "dev:client": "yarn --cwd client dev",
    "dev:server": "yarn --cwd server start:dev",
    "dev:all": "concurrently \"yarn dev:client\" \"yarn dev:server\"",
    "build:client": "yarn --cwd client build",
    "build:server": "yarn --cwd server build",
    "build:all": "yarn build:client && yarn build:server",
    "lint:client": "yarn --cwd client lint",
    "lint:server": "yarn --cwd server lint",
    "lint:all": "yarn lint:client && yarn lint:server",
    "test:server": "yarn --cwd server test"
  }
}
```

### Frontend setup (`client/`)

- Framework: React + Vite
- Dev port mặc định: **5173**
- `.env.example`:
  ```
  VITE_API_URL=http://localhost:8080/api
  ```
- Scripts tiêu biểu:
  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview",
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
    }
  }
  ```

### Backend setup (`server/`)

- Framework: NestJS
- Cổng mặc định: **8080**
- `.env.example`:
  ```
  MONGO_URI=mongodb://localhost:27017/roome
  PORT=8080
  JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
  JWT_EXPIRES_IN=7d
  NODE_ENV=development
  ```
- Scripts tiêu biểu:
  ```json
  {
    "scripts": {
      "start": "node dist/main",
      "start:dev": "nest start --watch",
      "start:prod": "node dist/main",
      "build": "nest build",
      "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
      "test": "jest",
      "test:e2e": "jest --config ./test/jest-e2e.json"
    }
  }
  ```

---

## 🧩 Key Backend Files

- `config/database.config.ts`: connects to MongoDB Atlas using `MONGO_URI`.
- `config/env.config.ts`: loads environment variables using `@nestjs/config`.
- `modules/user/`: sample `UserModule`, `UserController`, `UserService`, `UserSchema`.

---

## 🧠 Copilot Actions Checklist

Khi thiết lập hoặc cập nhật repo, Copilot nên:

1. Chạy `yarn install` tại thư mục gốc (Yarn workspaces tự liên kết client/server).
2. Tạo bản sao `.env` từ `.env.example` cho cả `client/` và `server/`, cập nhật `MONGO_URI`, `JWT_SECRET`, `VITE_API_URL` khi cần.
3. Kiểm tra backend bằng `yarn test:server` và (tùy chọn) `yarn build:server`.
4. Kiểm tra frontend bằng `yarn build:client` để chắc chắn build production pass.
5. Khi phát triển, dùng `yarn dev:all` (hoặc từng lệnh `yarn dev:client`, `yarn dev:server`) và đảm bảo port 5173/8080 trống.

---

## 🧰 Development Standards

- Duy trì ESLint + Prettier chung cho cả hai ứng dụng.
- TypeScript strict mode bật mặc định.
- Không hardcode URL backend/frontend; luôn đọc từ `.env`.
- Không tự ý thêm Docker/CI/CD bên ngoài pipeline đã có (`.github/workflows/ci.yml`) nếu không được yêu cầu.

---

## 🧪 Testing nhanh

- Backend: `yarn test:server`
- Frontend: (chưa có test mặc định) – có thể thêm sau khi phát triển component.
- Build kiểm tra: `yarn build:all`

---

## 📘 Documentation

Update `docs/architecture.md` with:

- System overview
- Module responsibilities
- Environment setup
- Future expansion plan

---

**End of Copilot setup guide for ROOME.**
