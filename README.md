# 🚀 Premium Full Stack Portfolio

A modern, premium portfolio website with a secure Admin Dashboard built with React.js, Node.js, Express.js, and Supabase.

---

## 🛠 Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Framer Motion, GSAP, React Router DOM  
**Backend:** Node.js, Express.js, JWT Authentication, Multer, Cloudinary  
**Database:** Supabase (PostgreSQL)  
**Deployment:** Vercel (Frontend + Backend), Supabase (Database)

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

**Backend** — copy `backend/.env.example` to `backend/.env` and fill in:
```
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=http://localhost:3000
```

**Frontend** — copy `client/.env.example` to `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### 3. Set Up Supabase Database

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `backend/supabase/schema.sql`
3. Copy your project URL and API keys to the `.env` files

### 4. Create Admin Account

After starting the backend, run once:
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"admin@portfolio.com","password":"Admin@123"}'
```

### 5. Start Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit:
- Portfolio: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin/login

---

## 🌐 Deployment

### Deploy Backend to Vercel
```bash
cd backend
vercel --prod
```
Set all env variables in Vercel dashboard.

### Deploy Frontend to Vercel
```bash
cd client
# Update VITE_API_URL to your backend Vercel URL
vercel --prod
```

---

## 📁 Project Structure

```
portfolio/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable components
│       │   ├── admin/         # Admin dashboard components
│       │   ├── auth/          # Auth components
│       │   ├── layout/        # Navbar, Footer
│       │   ├── sections/      # Homepage sections
│       │   └── ui/            # UI primitives
│       ├── context/           # React context (Auth, Data)
│       ├── hooks/             # Custom hooks
│       ├── layouts/           # Page layouts
│       ├── pages/             # Route pages
│       │   └── admin/         # Admin pages
│       ├── services/          # API service (Axios)
│       └── styles/            # Global CSS
│
└── backend/                   # Express API
    ├── config/                # Supabase, Cloudinary config
    ├── controllers/           # Route controllers
    ├── middleware/            # Auth, validation middleware
    ├── routes/                # Express routes
    ├── supabase/              # Schema SQL
    └── utils/                 # Helpers
```

---

## 🔑 Admin Dashboard Features

- 🔐 JWT-secured login
- 📊 Dashboard analytics
- ✏️ Edit Hero, About, Resume
- 🚀 CRUD Projects with gallery upload
- 🛠 CRUD Services
- 💡 CRUD Skills with progress bars
- 🎓 CRUD Education & Experience (timeline)
- ⭐ CRUD Testimonials
- 📬 View & manage contact messages
- 🔗 Social links manager
- 🌍 SEO meta tag editor
- ⚙️ Website settings & branding

---

## 🎨 Design Features

- Glassmorphism cards & UI elements
- Custom cursor with magnetic hover effect
- Scroll reveal animations (Framer Motion)
- Typing effect in hero section
- Gradient text & glow effects
- Parallax hero effect
- Premium loading screen
- Animated page transitions
- Swiper testimonials carousel
- Animated skill progress bars
- Timeline for experience & education
- Responsive across all devices

---

## 📜 License

MIT — build something amazing!
