# EtharaAI - Team Task Manager 🚀

A modern, professional full-stack team task management application with polished UI, dark mode, and seamless Railway deployment.

**Live Features:**
- ✨ Modern glassmorphism UI with smooth animations
- 🌙 Light/Dark theme with persistent storage
- 👁️ Password visibility toggle on auth forms
- 🔐 JWT-based authentication with role-based access
- 📊 Real-time dashboard with task analytics
- 🎯 Project and task management system
- 📱 Fully responsive design
- 🚀 Single-service Railway deployment

## Tech Stack

### Frontend
- **React 19** + **Vite** (lightning-fast build)
- **Tailwind CSS** with modern gradients and animations
- **Framer Motion** for smooth micro-interactions
- **Axios** for API communication
- **React Router v7** for navigation

### Backend
- **Node.js** + **Express 5**
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

---

## Folder Structure

```
EtharaAI/
├─ backend/
│  ├─ src/
│  │  ├─ config/          (MongoDB connection)
│  │  ├─ controllers/     (Business logic)
│  │  ├─ middleware/      (Auth, validation, error handling)
│  │  ├─ models/          (User, Project, Task schemas)
│  │  ├─ routes/          (API endpoints)
│  │  ├─ validations/     (Input validation rules)
│  │  ├─ utils/           (JWT token generation)
│  │  ├─ app.js           (Express app with static serving)
│  │  └─ server.js        (Server startup)
│  ├─ .env.example        (Environment template)
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/             (Axios client configuration)
│  │  ├─ components/      (Layout, StatCard, etc.)
│  │  ├─ context/         (Auth, Theme providers)
│  │  ├─ pages/           (Login, Signup, Dashboard, Projects)
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ index.css        (Global styles + dark mode)
│  ├─ .env.example        (Environment template)
│  └─ package.json
├─ package.json           (Root monorepo config)
└─ README.md
```

---

## Features

### 🎨 Modern UI/UX
- Professional glassmorphism design with gradient accents
- Smooth page transitions and micro-interactions
- Responsive grid layouts for all screen sizes
- Light & Dark theme support
- Password visibility toggle (Show/Hide) on login/signup

### 🔐 Authentication & Security
- Secure signup/login with JWT tokens
- Password hashing with bcryptjs
- Token persistence in localStorage
- Protected routes with automatic redirects
- Role-based access control (Admin/Member)

### 👥 Role-Based Access Control
- **Admin**: Create projects, manage members, create tasks, assign to team
- **Member**: View assigned tasks, update status, view projects

### 📁 Project Management
- Create projects with description
- Add/remove team members
- View all projects and member lists
- Project overview and analytics

### ✅ Task Management
- Create tasks under projects
- Assign to team members
- Update task status (pending, in progress, completed)
- View overdue tasks
- Filter by status

### 📊 Dashboard Analytics
- Total tasks count
- Completed tasks tracker
- Pending tasks alert
- Overdue tasks indicator
- Quick action cards

---

## Backend API Routes

### Auth (`/api/auth`)
- `POST /signup` - Create new account
- `POST /login` - Login with email & password
- `GET /me` - Get current user profile

### Users (`/api/users`)
- `GET /` - List all users (admin only)

### Projects (`/api/projects`)
- `GET /` - Get user's projects
- `POST /` - Create new project (admin)
- `PATCH /:projectId/members` - Add member (admin)
- `DELETE /:projectId/members/:userId` - Remove member (admin)

### Tasks (`/api/tasks`)
- `POST /projects/:projectId` - Create task (admin)
- `GET /projects/:projectId` - Get project tasks
- `PATCH /:taskId/status` - Update task status

### Dashboard (`/api/dashboard`)
- `GET /stats` - Get dashboard statistics

---

## Local Setup

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Install Dependencies

```bash
# From root directory
npm install
# This installs both backend and frontend dependencies
```

### Step 2: Configure Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

Add to `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
```

Add to `frontend/.env`:
```env
VITE_API_URL=/api
```

### Step 3: Build Frontend

```bash
cd frontend
npm run build
# Creates optimized dist folder
```

### Step 4: Start Backend

```bash
cd backend
npm start
# Backend runs on http://localhost:5000
# Frontend is served at http://localhost:5000
```

Open your browser at **http://localhost:5000**

---

## Railway Single-Service Deployment

This setup deploys as a **single service** with the backend serving the built frontend.

### Configuration in Railway

1. **Connect Repository**
   - Select GitHub repo (EtharaAI-assessment-)
   - Grant railway access

2. **Service Settings**
   - **Root Directory**: Leave empty (deploy from repo root)
   - **Build Command**: Automatic (uses root package.json)
   - **Start Command**: `cd backend && npm start`

3. **Environment Variables**
   - `PORT` - (Railway provides automatically)
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - `production`

4. **Deploy**
   - Railway will:
     1. Run `npm install` (installs backend & frontend)
     2. Run `npm run build` (builds frontend to dist)
     3. Run `npm start` (starts backend, which serves frontend)

5. **Access Your App**
   - Visit the Railway deployment URL
   - Frontend loads from `/`
   - APIs available at `/api/*`

### How It Works

The root `package.json` orchestrates the entire process:
- `npm install` - Installs dependencies in both directories
- `npm run build` - Builds the Vite frontend
- `npm start` - Starts the backend server
- Backend's `app.js` serves static files from `frontend/dist`
- All requests to non-API routes are redirected to `index.html` (SPA)

---

## Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev
# Hot reload on http://localhost:5173
```

### Backend Development
```bash
cd backend
npm run dev
# Uses nodemon for auto-restart on file changes
```

### Build for Production
```bash
# From root
npm run build
# Creates optimized production build
```

---

## Theme Switcher

Click the **☀️ Light / 🌙 Dark** button in the header to toggle theme. Your preference is saved automatically to localStorage.

---

## Password Visibility Toggle

On login and signup pages, use the **Show/Hide** button next to the password field to toggle visibility for easier entry.

---

## Key Features Breakdown

### 🎯 Authentication Flow
1. User signs up → password hashed → JWT token created
2. Login validates credentials → returns token
3. Token stored in localStorage
4. Protected routes check token validity
5. Logout clears token

### 🔒 Role-Based Authorization
- Middleware checks user role before allowing actions
- Admin can manage projects and members
- Members can only view/update assigned tasks

### 📊 Real-Time Dashboard
- Loads task statistics on page load
- Displays total, completed, pending, and overdue tasks
- Shows quick action cards for common operations

### 🎨 Modern UI System
- Gradient backgrounds and text
- Glassmorphism effects with backdrop blur
- Smooth animations via Framer Motion
- Responsive Tailwind grid system
- Color-coded status indicators

---

## Error Handling

- Input validation on all forms
- API error messages displayed via toast notifications
- Global error middleware catches server errors
- 404 routes redirect to dashboard (for logged-in users)

---

## Performance Optimizations

- Code splitting with dynamic imports
- Optimized Tailwind CSS (only used classes)
- Lazy loading components
- Compressed assets (~140KB gzipped JS)
- Efficient API calls with axios interceptors

---

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

## License

MIT - Feel free to use this project for personal or commercial purposes.

---

## Support

For issues or questions:
1. Check the Railway logs for error details
2. Verify environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check browser console for frontend errors

---

**Built with ❤️ by EtharaAI**

