# Front Development Docs

This repository contains the frontend for WevyTask. It is built using React, Typescript, Tailwind, React Router, Test Library.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you have Node.js and npm installed.

## Installing

1. **Clone the main repo**
   ```bash
   git clone https://github.com/NatanBB/desafiowevy.git
   cd desafiowevy
   cd web
   ```
2. **Install NPM packages**
   ```bash
   npm install
   ```

#### Running the Web
To start the project, run:
   ```bash
   npm start
   ```
The web running in http://localhost:3000 by default.

## Project Structure
```bash
assets => To all assets
components => To compact components
modules => All modules to pages
pages => main content for pages
services => api services
tests => to unit tests
types => to all types using in project
utils => to functions and hooks utilities
```
```bash
├── contexts
│   └── authcontext.tsx      # Authentication context and user management
├── pages
│   ├── 404.tsx              # Not Found Page
│   ├── login.tsx            # Login page
│   └── main.tsx             # Main task management page
├── components
│   ├── AvatarUser.tsx       # Reusable avatar user component
│   ├── Button.tsx           # Reusable button component
│   ├── Input.tsx            # Reusable input component
│   ├── Loading.tsx          # Loading spinner component
│   └── ToggleButton.tsx     # Toggle button component
├── modules
│   ├── listTodo.tsx         # Application list taks module
│   ├── header.tsx           # Application header module
│   └── footer.tsx           # Application footer module
├── services
│   └── api.tsx              # Axios client configuration for API calls
├── types
│   └── commonTypes.ts       # Common data types used in the application
├── utils
│   ├── components           # Utility functions, e.g., validation and sorting
│   ├── protectRouts         # Utility to protect routes autenticated
│   └── functions            # Custom hooks, e.g., modified useEffect
├── tests
│   ├── components           # All components tests
│   └── functions            # All functions tests
└── assets
    └── logo.png             # Application logo
```

## Key Features
- Authentication: Login/logout management and session persistence using JWT tokens.
- Task Management: Full CRUD operations for tasks, including add, edit, delete, and mark as complete.
- Responsive Interface: Utilization of Tailwind CSS for responsive and user-friendly styles.

## Testing
Unit tests are implemented using Jest and Test Library for functions and componentes. To run tests:

```bash
npm test
```
