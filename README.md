Here’s a complete, well-structured `README.md` for your **Digital Wallet API** project. This includes setup, usage, route details, technologies used, and more.

---

```markdown
# 💰 Digital Wallet API

A robust and secure digital wallet RESTful API built with **Node.js**, **Express**, and **MongoDB**. It supports user roles (`user`, `agent`, `admin`) with functionality like sending/withdrawing money, commission tracking, and agent approval.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - JWT-based login system
  - Role-based access (`user`, `agent`, `admin`)
- 💼 **Wallet Operations**
  - Add, withdraw, send money
  - Block/unblock wallets
- 🤝 **Agent Functionality**
  - Commission on transfers
  - Admin approval for agent role
- 📊 **Transaction History**
  - View personal transactions
  - Agents see their commissions
- ⚙️ **Admin Controls**
  - Approve agents
  - View all users
  - Block wallets

---

## 📁 Project Structure

```

src/
│
├── app/
│   ├── router.ts
│   └── utils/ (constants, middlewares, etc.)
│
├── modules/
│   ├── user/
│   ├── auth/
│   ├── Wallet/
│   └── Transaction/
│
├── config/
│   └── index.ts (env configs, DB connection)
│
└── server.ts

````

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/digital-wallet-api.git
cd digital-wallet-api
npm install
````

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wallet-db
```

---

## ▶️ Running the App

```bash
# Dev mode
npm run dev

# Prod mode
npm run build && npm start
```

---

## 🔐 Authentication

* **Register**: `POST /api/register`
* **Login**: `POST /api/login`
* Returns JWT token. Add it in headers:

```
Authorization: Bearer <token>
```

---

## 🧑 User Routes

| Method | Endpoint          | Description           | Access      |
| ------ | ----------------- | --------------------- | ----------- |
| GET    | `/api/me`         | Get my wallet info    | user, agent |
| POST   | `/api/add-money`  | Add money to wallet   | user, agent |
| POST   | `/api/withdraw`   | Withdraw money        | user, agent |
| POST   | `/api/send-money` | Send money to another | user        |
| GET    | `/api/history`    | My transactions       | user, agent |

---

## 🧑‍💼 Agent Routes

| Method | Endpoint           | Description           | Access |
| ------ | ------------------ | --------------------- | ------ |
| GET    | `/api/commissions` | My commission history | agent  |

---

## 👮 Admin Routes

| Method | Endpoint             | Description           | Access |
| ------ | -------------------- | --------------------- | ------ |
| PATCH  | `/api/approve-agent` | Approve agent request | admin  |
| PATCH  | `/api/block`         | Block a user's wallet | admin  |
| GET    | `/api/all-users`     | View all users        | admin  |

---

## 🔑 Middleware Used

* `authenticate`: Verifies JWT token
* `restrictTo(role1, role2, ...)`: Allows access to specific roles only
* `validate(schema)`: Validates request using Zod

---

## 🛠️ Technologies Used

* Node.js + Express
* MongoDB + Mongoose
* JWT for authentication
* Zod for validation
* TypeScript
* REST API

---

## 🧪 Example cURL Requests

```bash
# Register
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"John", "email":"john@example.com", "password":"123456", "role":"agent"}'

# Login
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com", "password":"123456"}'

# Add Money
curl -X POST http://localhost:5000/api/add-money \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"amount": 500}'
```

---

## 📦 Future Improvements

* Email notifications
* Admin dashboard
* OTP-based withdrawals
* Deposit/withdrawal limits

---

## 🧑‍💻 Author

Developed by **Chrabon Dey**

> *Feel free to contribute, suggest improvements, or fork the repo!*

---

