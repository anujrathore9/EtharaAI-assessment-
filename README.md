# Team Task Manager (Full Stack)

Production-ready full-stack Team Task Manager with:
- React + Vite + Tailwind CSS frontend
- Node.js + Express + MongoDB backend
- JWT auth + role-based access (`admin`, `member`)
- Railway-ready deployment setup

## Folder Structure

```text
EtharaAI/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ validations/
│  │  ├─ utils/
│  │  ├─ app.js
│  │  └─ server.js
│  ├─ .env.example
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  └─ index.css
│  ├─ .env.example
│  └─ package.json
└─ README.md
```

## Features

### Authentication
- Signup/Login with JWT
- Password hashing with `bcryptjs`
- Protected routes with token middleware

### Role-Based Access
- **Admin**: create projects, add/remove members, create/assign tasks
- **Member**: view assigned tasks and update status

### Project Management
- Create project
- Add/remove members
- Project fields: `name`, `description`, `members`

### Task Management
- Create tasks under project
- Assign to project members
- Task fields: `title`, `description`, `status`, `dueDate`, `assignedTo`
- Status updates by assignee (member) or owner admin
- Filters: `status`, `overdue` (bonus)

### Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks

## Backend API Routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users (Admin)
- `GET /api/users`

### Projects
- `GET /api/projects`
- `POST /api/projects` (admin)
- `PATCH /api/projects/:projectId/members` (admin)
- `DELETE /api/projects/:projectId/members/:userId` (admin)

### Tasks
- `POST /api/tasks/projects/:projectId` (admin)
- `GET /api/tasks/projects/:projectId`
- `PATCH /api/tasks/:taskId/status`

### Dashboard
- `GET /api/dashboard/stats`

---

## Environment Variables

### Backend (`backend/.env`)
Copy `backend/.env.example` to `.env`.

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `.env`.

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Run Locally (Step-by-step)

### 1) Run Backend
```bash
cd backend
npm install
# create .env from .env.example (copy manually on Windows)
# update .env with your Mongo URI + JWT secret
npm run dev
```
Backend runs on `http://localhost:5000`.

### 2) Run Frontend
```bash
cd frontend
npm install
# create .env from .env.example (copy manually on Windows)
npm run dev
```
Frontend runs on `http://localhost:5173`.

### 3) Connect MongoDB
1. Create a MongoDB Atlas cluster.
2. Create database user + whitelist your IP.
3. Get connection string and paste it into `backend/.env` as `MONGO_URI`.
4. Restart backend after updating `.env`.

### 4) Deploy on Railway

You can deploy as **two Railway services** from the same repo.

#### Backend Service
1. New Project -> Deploy from GitHub repo.
2. Set service root to `backend`.
3. Add env vars: `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`.
4. Start command: `npm start`.
5. Deploy and copy backend public URL.

#### Frontend Service
1. Create second service with root `frontend`.
2. Add env var: `VITE_API_URL=https://<your-backend-url>/api`
3. Build command: `npm run build`
4. Start command: `npm run preview -- --host 0.0.0.0 --port $PORT`
5. Deploy and open frontend URL.

#### Final CORS Setup
- Update backend `CLIENT_URL` to your Railway frontend domain.
- Redeploy backend.

---

## Notes
- Backend follows MVC (models/controllers/routes/middleware).
- Input validation uses `express-validator`.
- Global error middleware is included.
- UI is responsive and includes basic card animations (`framer-motion`).
