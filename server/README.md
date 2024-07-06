# Backend Development Docs

This repository contains the backend server for WevyTask. It is built using Node.js, Fastify, Prisma for database ORM, and JWT for authentication.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have Node.js and npm installed.

## Installing

1. **Clone the main repo**
   ```bash
   git clone https://github.com/NatanBB/desafiowevy.git
   cd desafiowevy
   cd server
   ```
2. **Install NPM packages**
   ```bash
   npm install
   ```
## Database Setup
This project uses SQLite with Prisma. The database file (dev.db) and migration scripts are located in the server/prisma directory.

#### Running the Server
To start the server, run:
   ```bash
   npm run dev
   ```
The server listen http://localhost:3333 by default.

## Project Structure
```bash
/server
  /prisma
    /migrations
  dev.db
  schema.prisma
  seed.ts
/src
  /@types
    common.ts
    fastify-jwt.d.ts
  /controllers
    authController.ts
    userController.ts
    taskController.ts
  /lib
    prisma.ts
  /middlewares
    authenticate.ts
  /routes
    authRoutes.ts
    userRoutes.ts
    taskRoutes.ts
  /services
    authService.ts
    userService.ts
    taskService.ts
  /tests
    auth.spec.ts
    task.spec.ts
  server.ts
```

## Usage

### Authentication

The API uses JWT (JSON Web Token) for authentication. Tokens are generated upon successful login and are required for accessing protected routes.

### Endpoints

#### Auth Routes

- `POST /login`: Authenticates a user and returns a JWT token.

#### User Routes

- `GET /users`: Retrieves all users.
- `POST /users`: Creates a new user.
- `GET /users/:user_id`: Retrieves user details by ID.
- `PUT /users/:user_id`: Updates user details by ID.
- `DELETE /users/:user_id`: Deletes a user by ID.

#### Task Routes

- `GET /tasks`: Retrieves all tasks.
- `GET /tasks/:user_id`: Retrieves tasks for a specific user.
- `POST /tasks`: Creates a new task.
- `PUT /tasks/:task_id`: Updates a task by ID.

## Testing
Unit tests are implemented using Jest for controllers and services. To run tests:

```bash
npm test
```
