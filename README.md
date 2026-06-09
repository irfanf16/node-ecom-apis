# Node E-Commerce APIs

A lightweight **Node.js + Express REST API** for an e-commerce backend — user registration, JWT authentication via HTTP-only cookies, and full user CRUD. Backs the `react-ecom-web` frontend.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-8.7-880000?style=flat)
![JWT](https://img.shields.io/badge/jsonwebtoken-9.0-000000?style=flat&logo=jsonwebtokens)
![bcryptjs](https://img.shields.io/badge/bcryptjs-2.4-4A90D9?style=flat)

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | No | Register user (bcrypt hash, `role: 'user'` enforced) |
| POST | `/api/login` | No | Login, JWT set in HTTP-only cookie |
| GET | `/api/logout` | No | Clear auth cookie |
| GET | `/api/user` | Yes | Get authenticated user |
| PUT | `/api/user` | Yes | Update user by `_id` |
| DELETE | `/api/user` | Yes | Delete user by `id` |
| GET | `/api/users` | No | List all users (admin use) |

Auth middleware (`authToken`) reads JWT from cookie or `x-auth-token` header.

## Database Schema (MongoDB — `users` collection)

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique, regex validated |
| `password` | String | Required (bcrypt hash) |
| `profile_pic` | String | Default: `''` |
| `phone` | String | Default: `''` |
| `role` | String | `enum: ['user', 'admin']`, default: `'user'` |

## Architecture

```
index.js → Express: CORS, cookie-parser, routes, DB connect
routes/index.js → All route definitions
controllers/ → register, login, logout, userController
middlewares/authToken.js → JWT verification
models/userModel.js → Mongoose schema
services/userService.js → DB query helpers
config/database.js → mongoose.connect()
```

> **Security Note:** `.env` with MongoDB Atlas URI was committed to the repo — rotate these credentials.

## Getting Started

```bash
npm install
cp .env.example .env
# Edit .env: MONGODB_URI, TOKEN_SECRET_KEY, FRONTEND_URL
npm run dev   # nodemon, port 5000
```

## Environment Variables

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
PORT=5000
TOKEN_SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## License
MIT
