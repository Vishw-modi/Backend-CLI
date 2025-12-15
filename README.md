# 🚀 Create Backend App CLI

A lightweight Node.js CLI tool to scaffold a **production-ready Express backend** with a **senior-level folder structure** in a single command.

This CLI generates a clean architecture with **routes, controllers, services, models, middleware**, and a pre-configured example API.

---

## ✨ Features

- 📁 Opinionated, scalable backend structure
- 🔗 Clean separation of concerns (Routes → Controllers → Services)
- 🧠 Centralized error handling middleware
- 🧪 Example API with **GET & POST** already wired
- ⚡ One-command setup (structure + dependencies)
- 🛠️ Nodemon configured for development
- 🌱 Environment variables support (`dotenv`)
- 🚫 Safe `.gitignore` (no `node_modules` commits)

---

## 📦 Generated Project Structure

```text
my-backend/
├── src/
│   ├── routes/
│   │   └── example.routes.js
│   ├── controllers/
│   │   └── example.controller.js
│   ├── services/
│   │   └── example.service.js
│   ├── models/
│   │   └── example.model.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── config/
│   └── app.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
# 🚀 create-backend-app

A modern CLI tool to scaffold production-ready Node.js backend projects with industry-standard architecture.

## ✨ Features

- 🏗️ Layered architecture (Routes → Controllers → Services → Models)
- ⚡ Express.js server setup
- 🔄 Hot reload with nodemon
- 🛡️ CORS & environment variables configured
- 📁 Organized folder structure
- 🎯 Ready-to-use API examples

## 🚀 Getting Started

### 1️⃣ Install / Link the CLI (local development)

```
npm link
```

This makes the `create-backend-app` command available globally.

### 2️⃣ Create a new backend project

```
create-backend-app my-backend
```

### 3️⃣ Run the development server

```
cd my-backend
npm run dev
```

Server will start at: [**http://localhost:5000**](http://localhost:5000)

## 📡 Example API Endpoints

### 🔹 GET Example

```
GET /api/examples
```

**Response:**

```
{
  "success": true,
  "data": [
    { "id": 1, "name": "Example One" },
    { "id": 2, "name": "Example Two" }
  ]
}
```

### 🔹 POST Example

```
POST /api/examples
Content-Type: application/json
```

**Body:**

```
{
  "name": "My Example"
}
```

**Response:**

```
{
  "success": true,
  "data": {
    "id": 1710000000000,
    "name": "My Example"
  }
}
```

## 🧠 Architecture Philosophy

This project follows industry-standard layered architecture:

| Layer | Responsibility |
|-------|----------------|
| Routes | HTTP routes & methods |
| Controllers | Request & response handling |
| Services | Business logic |
| Models | Data layer (DB-ready) |
| Middleware | Error handling, auth, validation |

This structure improves:
- ✅ Maintainability
- ✅ Testability
- ✅ Scalability

## 🛠️ Available Scripts

```
npm run dev    # Start server with nodemon
npm start      # Start server normally
```

## 🧩 Built With

- Node.js
- Express.js
- dotenv
- cors
- nodemon

## 📌 Roadmap

- [ ] TypeScript support
- [ ] MongoDB / Prisma integration
- [ ] Auth boilerplate (JWT)
- [ ] Request validation (Zod / Joi)
- [ ] Module generator (`create-backend-app generate user`)
- [ ] Publish to npm

## 📄 License

MIT License

## 👤 Author

**Vishw Modi**

- GitHub: [@Vishw-modi](https://github.com/Vishw-modi)

## ⭐ Support

If you find this useful, consider starring the repository!

---

*Built with ❤️ for the Node.js community*
