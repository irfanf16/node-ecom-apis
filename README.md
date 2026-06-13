# Node.js eCommerce REST API

> **Node.js + Express + MongoDB** REST API backend for the eCommerce platform. Implements clean service-layer architecture, JWT cookie authentication with `x-auth-token` header fallback, bcrypt password hashing, and role-based user accounts.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `express` | ^4.21.0 | HTTP framework |
| `mongoose` | ^8.7.0 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT generation + verification |
| `bcryptjs` | ^2.4.3 | Password hashing |
| `cookie-parser` | ^1.4.6 | Reads JWT from HTTP-only cookies |
| `cors` | ^2.8.5 | Cross-origin resource sharing |
| `dotenv` | ^16.4.5 | Environment variable loading |
| `nodemon` | ^3.1.7 | Dev auto-restart |

**Port:** `process.env.PORT || 5000`

---

## Architecture

**Service-layer pattern** — controllers delegate DB operations to `userService`, keeping database logic separate from request handling.

```
Request
  |
  v
Route
  |
  v
Middleware (authToken — JWT validation)
  |
  v
Controller
  |  delegates DB queries
  v
Service (userService.js)
  |
  v
Mongoose Model
  |
  v
MongoDB Atlas
```

---

## API Routes

All under `/api/` prefix:

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/register` | None | Register new user (bcrypt hash password) |
| `POST` | `/api/login` | None | Login — sets JWT as HTTP-only cookie |
| `GET` | `/api/logout` | None | Clear auth cookie |
| `GET` | `/api/user` | JWT | Get authenticated user profile |
| `PUT` | `/api/user` | JWT | Update user profile |
| `DELETE` | `/api/user` | JWT | Delete user account |
| `GET` | `/api/users` | None | List all users (admin utility) |

---

## Database Schema

**`users` collection** (Mongoose, `timestamps: true`):

| Field | Type | Constraints |
|---|---|---|
| `name` | String | required |
| `email` | String | required, unique, regex validated |
| `password` | String | required, bcrypt hashed |
| `profile_pic` | String | default: `''` |
| `phone` | String | default: `''` |
| `role` | String (enum) | `['user', 'admin']`, default: `'user'` |
| `createdAt` / `updatedAt` | Date | auto (timestamps) |

---

## Authentication

**`authToken` middleware** (`middlewares/authToken.js`):
1. Reads JWT from `req.cookies.token` (HTTP-only cookie set at login)
2. Falls back to `req.header('x-auth-token')` (mobile/Postman clients)
3. Verifies with `process.env.TOKEN_SECRET_KEY`
4. Attaches `req.user = decoded` payload on success
5. Returns `401` on invalid/missing token

**CORS:** Configured for `FRONTEND_URL` with `credentials: true` — allows the React frontend to send cookies cross-origin.

---

## Project Structure

```
index.js              — App bootstrap, DB connect, CORS, routes
config/
  database.js         — Mongoose connection (process.exit on failure)
routes/
  index.js            — All route definitions
controllers/
  registerController.js
  loginController.js
  logoutController.js
  userController.js   — getUser, updateUser, deleteUser, usersList
middlewares/
  authToken.js        — JWT verification middleware
models/
  userModel.js        — User schema + model
services/
  userService.js      — DB query abstraction (findByEmail, createUser, etc.)
```

---

## Getting Started

```bash
npm install
cp .env.example .env
# Required: MONGO_URI, TOKEN_SECRET_KEY, FRONTEND_URL, PORT
npm run dev        # nodemon
npm start          # node index.js
```

**Environment variables:**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
TOKEN_SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

## Related Repositories

| Repo | Purpose |
|---|---|
| `react-ecom-web` | React 18 + Redux Toolkit frontend (consumes this API) |
