# ROOME Monorepo

Nền tảng đặt phòng (graduation project) được xây dựng với React (frontend) và NestJS (backend), quản lý chung bằng Yarn workspaces.

## 🌐 Cấu trúc tổng quan

```
ROOME/
├── client/          # React + Vite (port 5173)
├── server/          # NestJS REST API (port 8080)
├── docs/            # Tài liệu kỹ thuật
└── .github/         # Workflow CI và hướng dẫn cho AI agent
```

- Root `package.json` cung cấp script điều khiển cho cả hai ứng dụng.
- `.github/copilot-instructions.md` mô tả quy tắc thiết lập dành cho AI/automation.

## ⚡ Quick Start cho thành viên

1. **Yêu cầu môi trường**
   ```bash
   node --version   # >= 22.x
   yarn --version   # >= 1.22.x
   ```
2. **Cài đặt**
   ```bash
   git clone <repo-url>
   cd ROOME/ROOME
   yarn install
   ```
3. **Chuẩn bị biến môi trường**
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   # Cập nhật client/.env nếu backend chạy ở URL khác
   # Cập nhật server/.env với MONGO_URI, JWT_SECRET thật
   ```
4. **Chạy song song frontend + backend**
   ```bash
   yarn dev:all
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8080/api

## 🧩 Script thường dùng (chạy tại thư mục gốc)

| Lệnh              | Mô tả                                                  |
| ----------------- | ------------------------------------------------------ |
| `yarn dev:client` | Chạy chỉ frontend                                      |
| `yarn dev:server` | Chạy chỉ backend (hot reload Nest CLI)                 |
| `yarn test:server`| Chạy Jest test cho backend                             |
| `yarn lint:all`   | ESLint cho cả client và server                         |
| `yarn build:all`  | Build production cho cả hai ứng dụng                   |
| `yarn build:client` / `yarn build:server` | Build riêng từng ứng dụng     |

> Lưu ý: `yarn start` trong `server/` dùng file build ở `server/dist`, vì vậy hãy chạy `yarn build:server` trước khi start production.

## 🔐 Environment variables

| Ứng dụng | File | Biến quan trọng |
| -------- | ---- | --------------- |
| Client   | `client/.env` | `VITE_API_URL` (URL backend) |
| Server   | `server/.env` | `MONGO_URI`, `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV` |

- MongoDB Atlas cần whitelist IP (hoặc dùng Mongo local: `mongodb://localhost:27017/roome`).
- `JWT_SECRET` bắt buộc thay đổi trước khi deploy.

## ✅ Kiểm tra nhanh

```bash
yarn test:server   # đảm bảo backend test pass
yarn build:client  # kiểm tra build production frontend
yarn build:server  # kiểm tra build production backend
```

## 🛠️ Troubleshooting

- **Không connect được MongoDB Atlas**: kiểm tra `MONGO_URI` và whitelist IP trên Atlas.
- **`yarn start` backend báo thiếu file dist**: chạy `yarn build:server` trước khi start production mode.
- **Port bị chiếm**: đổi `PORT` (backend) hoặc `VITE_DEV_SERVER_PORT` (frontend) trong `.env`.

## 📚 Tài liệu liên quan

- `docs/architecture.md`: kiến trúc hệ thống, flow dữ liệu.
- `docs/QUICKSTART.md` & `docs/SETUP_SUMMARY.md`: ghi chú chi tiết hơn cho giai đoạn khởi tạo.
- `.github/copilot-instructions.md`: hướng dẫn dành cho AI agent và automation.

---

> Dự án thuộc đồ án tốt nghiệp của đội 5 thành viên. Vui lòng commit theo chuẩn Git Flow của nhóm và cập nhật tài liệu khi thay đổi kiến trúc.
