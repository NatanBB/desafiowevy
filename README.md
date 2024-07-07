# <img src="./web/src/assets/logo.png" height=25 alt="logo wevy task ref: freepik"> WevyTask Project | Wevy Challenge

### :blue_heart: This project is a simple to-do list application, developed in Node.js with Fastify on the backend and React on the frontend.
![alt text](https://i.imgur.com/jrBRxWa.png) ![alt text](https://i.imgur.com/aPjWZFS.png)

## Features

- **Authentication**:
  - User login with JWT authentication.
  - Logout functionality.

- **Tasks**:
  - Full CRUD operations for tasks (add, update, delete).
  - Lists for pending and completed tasks.
  - Search functionality for tasks.
  - Expansion of inputs for accessibility

## Technologies Used

- **Backend**:
  - Node.js
  - Fastify
  - JWT for authentication
  - Prisma for ORM and database interaction
 
#### [See the backend docs development](https://github.com/NatanBB/desafiowevy/blob/main/server/README.md)

- **Frontend**:
  - React
  - TypeScript
  - Axios for HTTP requests
 
#### [See the frontend docs development](https://github.com/NatanBB/desafiowevy/blob/main/web/README.md)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NatanBB/desafiowevy.git
   cd desafiowevy
   ```
2. **Setup Backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. **Setup Frontend:**
   
   ```bash
   cd web
   npm install
   npm start
   ```

## Usage

### Login:
- Login with fixed credentials. (Obs: Logging functionality may be added in the future.)

#### Login with different users:
With the application running:

- First Login:
```bash
user: admin
password: admin
```
- Second Login:
```bash
user: natanboos
password: fakepasswevy
```

### Task Management:
- Add new tasks.
- Mark tasks as completed.
- Update task informations.
- Delete unnecessary tasks or completed tasks.

### Search:
- Use the search bar to find specific tasks.

### Logout:
- End your session when done.

## Contributing

Feel free to contribute improvements to this project! If you have suggestions, open an issue or submit a pull request.
