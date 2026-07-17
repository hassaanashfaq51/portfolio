# 🌟 Muhammad Hassaan - Full-Stack Developer Portfolio

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=for-the-badge&logo=vercel&logoColor=white)](https://hassaan-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react&logoColor=cyan)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.19-lightgrey?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-emerald?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

Welcome to the GitHub repository of my professional portfolio. This is a production-ready, full-stack application built using the modern React/Vite frontend ecosystem and a backend powered by Node.js/Express with Supabase as the serverless PostgreSQL database.

---

## 🚀 Live Links

- **🔗 Live Portfolio URL:** [https://hassaan-portfolio.vercel.app](https://hassaan-portfolio.vercel.app)
- **📄 Download Resume:** [Muhammad_Hassaan_Resume.pdf](file:///public/assets/Muhammad_Hassaan_Resume.pdf)

---

## 👨‍💻 About Me

I am a dedicated **Full-Stack Developer** committed to building clean, high-performance, and scalable digital solutions. My approach to engineering centers on resolving real-world problems through modular architectural designs, robust database operations, and high-fidelity, intuitive frontend interfaces.

Specializing in the JavaScript/Node.js ecosystem, I leverage React.js for clean UI structures and Express for backend microservices, unified under Supabase serverless databases. I operate with a problem-solving mindset, writing maintainable code that delivers exceptional user experiences.

---

## 🌟 Portfolio Features

*   **✨ Modern & Fluid UI/UX:** Built with Tailwind CSS, custom cursors, dynamic dark mode support, and smooth micro-animations using Framer Motion.
*   **📂 Dynamic Projects Section:** Fetching project information directly from a backend API, showing technologies, features list, and live/GitHub repository links.
*   **🛡️ Secure Admin Dashboard:** Admin login overlay allowing database-driven creation, modification, and deletion of projects directly from the web client.
*   **💬 Intelligent Chatbot Drawer:** Interactive floating chat assistant to answer recruiter/client questions in real-time, utilizing Supabase-backed services.
*   **📅 Free Tech Consultation Booking:** Seamless appointment booking form that writes requests directly to the database.
*   **📨 Real-time Inquiry Form:** Contact and message form with immediate validation and success confirmation.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (v18.3.1), Vite | Core framework and fast build tool |
| **Styling & Motion**| Tailwind CSS, Framer Motion | Modern styling and fluid page transitions |
| **Icons** | Lucide React | Clean, scalable vector iconography |
| **Backend** | Node.js, Express.js | API architecture and router handling |
| **Database** | Supabase (PostgreSQL) | Serverless data persistence, authentication, and RLS |
| **Tools** | PDFKit, Cors, Dotenv | Resume compilation & server configurations |

---

## 📂 Project Structure

The project is structured as a mono-repository containing both the frontend client and the backend API server:

```
├── backend/                  # Express API Server
│   ├── data/                 # JSON seed data & SQL schemas
│   ├── node_modules/         # Server-side dependencies
│   ├── src/                  # Server source files
│   │   ├── config/           # Database configurations (Supabase Client)
│   │   ├── controllers/      # Route logic handlers (Projects, Consultations, Chat)
│   │   ├── routes/           # API routes declarations
│   │   └── server.js         # API Server entry point
│   ├── .env.example          # Backend environment variables structure
│   └── package.json          # Backend dependencies and scripts
│
├── public/                   # Frontend Static Assets
│   ├── assets/               # Resume PDF & Images
│   └── favicon.svg           # Website Favicon
│
├── src/                      # React Frontend Source
│   ├── assets/               # Images and design assets
│   ├── components/           # Reusable UI Components (Navbar, Cursor, Dashboard, Chatbot)
│   ├── context/              # Context API providers (Theme Context)
│   ├── sections/             # Portfolio sections (Hero, About, Projects, Contact, Skills)
│   ├── utils/                # Framer Motion animations & utility setups
│   ├── App.jsx               # Main React Application
│   └── main.jsx              # Application entry point
│
├── .env.example              # Frontend environment variables template
│   .gitignore                # Git exclusions list
│   index.html                # Main index markup
│   package.json              # Root/Frontend dependencies and scripts
│   tailwind.config.js        # Tailwind styling configurations
│   vite.config.js            # Vite compiler configurations
└── vercel.json               # Vercel multi-service deployment settings
```

---

## 🔑 Environment Variables

To run this application locally, you need to configure the following environment variables.

### Frontend (`/.env`)
Create a `.env` file at the root of the project:
```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Backend (`/backend/.env`)
Create a `.env` file inside the `backend` directory:
```env
PORT=5000
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

---

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js (v18.x or later)
*   npm (v9.x or later)

### Step-by-Step Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/hassaanashfaq51/portfolio.git
    cd portfolio
    ```

2.  **Install Root & Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

4.  **Configure Environment Variables:**
    Set up the `.env` files in both the root and `backend` directories using the details in the [Environment Variables](#-environment-variables) section.

5.  **Run Locally in Development Mode:**
    *   **Start the Backend Server (Port 5000):**
        ```bash
        cd backend
        npm run dev
        ```
    *   **Start the Frontend Dev Server (Port 3000):**
        ```bash
        # In a new terminal window at the root
        npm run dev
        ```

6.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 📬 Contact & Socials

Let's collaborate on your next digital solution!

*   **📧 Email:** [hassanashfaq51@gmail.com](mailto:hassanashfaq51@gmail.com)
*   **🐙 GitHub:** [github.com/hassaanashfaq51](https://github.com/hassaanashfaq51)
*   **💼 LinkedIn:** [linkedin.com/in/m-hassaan-57845508](https://linkedin.com/in/m-hassaan-57845508)
*   **💬 WhatsApp:** [+92 311 6647440](https://wa.me/923116647440)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
