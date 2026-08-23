export const blogArticles = [
  {
    id: "responsive-frontend",
    title: "Building a Responsive Frontend Interface with HTML5 & CSS3",
    category: "Frontend Development",
    readTime: "5 min read",
    description: "Exploring the process of building a responsive, mobile-first frontend interface using modern HTML5 and CSS3 techniques, with a focus on clean structure, responsive layouts, usability, and polished visual presentation.",
    tags: ["HTML5", "CSS3", "CSS Grid", "Responsive Design", "Mobile-First Design"],
    content: [
      {
        type: "heading",
        text: "The Purpose of the Project"
      },
      {
        type: "paragraph",
        text: "In modern web design, a frontend interface must be more than just visually appealing; it must be performant, accessible, and adaptable across all viewports. The primary goal of this project was to establish a design system and frontend interface that works natively from tiny mobile displays up to high-resolution desktop monitors. By utilizing core standards like semantic HTML5 and vanilla CSS3 (including custom properties and layout modules), I sought to build a template that delivers fast loading times and absolute flexibility."
      },
      {
        type: "heading",
        text: "Mobile-First Development Approach"
      },
      {
        type: "paragraph",
        text: "Instead of writing styles for desktop and trying to fit them onto mobile (which leads to bloated CSS overrides and media query complexity), I adopted a strict mobile-first workflow. The CSS code starts with the base layout designed specifically for a single column on a 320px viewport. As the screen size increases, media queries are introduced progressively using minimum width guidelines:"
      },
      {
        type: "code",
        language: "css",
        code: `/* Base styles for mobile viewports */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Enhancements for tablets and laptops */
@media (min-width: 768px) {
  .card-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Enhancements for large screens */
@media (min-width: 1024px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}`
      },
      {
        type: "paragraph",
        text: "This mobile-first approach keeps code clean, reduces layout shifts, and ensures mobile browsers (which often run on slower hardware) don't have to process unnecessary rules."
      },
      {
        type: "heading",
        text: "Responsive Layouts & CSS Grid"
      },
      {
        type: "paragraph",
        text: "To build the grid layouts without relying on complex calculations, I used CSS Grid. With rules like \`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))\`, the interface dynamically adjusts the number of columns based on available space, eliminating layout gaps while remaining clean. For sub-components, CSS Flexbox handles one-dimensional items like navigation elements and icon alignments."
      },
      {
        type: "heading",
        text: "Clean HTML5 Structure & Usability"
      },
      {
        type: "paragraph",
        text: "Semantic tags are vital for SEO and screen reader software. I structured the markup using native HTML5 elements such as \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, and \`<footer>\`. Interactive elements are wrapped in standard buttons and anchors with proper accessibility labels. Usability was enhanced by ensuring contrast ratios meet WCAG standards, font sizes remain readable, and tap targets are at least 48x48px in size."
      },
      {
        type: "heading",
        text: "Visual Presentation"
      },
      {
        type: "paragraph",
        text: "The aesthetic design uses a clean layout with curated gradients, subtle shadows, and responsive micro-interactions (e.g. slight card elevations, smooth button scale adjustments on tap, and transition effects). These visual highlights are implemented using vanilla CSS animations, which run directly on the browser's compositor thread for maximum fluid performance."
      },
      {
        type: "heading",
        text: "Key Takeaways and Lessons Learned"
      },
      {
        type: "list",
        items: [
          "Media query hygiene is critical; grouping responsive overrides systematically simplifies stylesheet debugging.",
          "CSS Grid reduces the amount of structural div wrapper elements, leading to cleaner DOM trees.",
          "Mobile-first design is not just a style guideline; it is a development mindset that yields better responsive performance."
        ]
      }
    ]
  },
  {
    id: "restful-backend",
    title: "Building a RESTful Backend API with Node.js & Express.js",
    category: "Backend Development",
    readTime: "6 min read",
    description: "Exploring the development of a modular RESTful backend API using Node.js and Express.js, including structured API routes, request handling, CRUD-oriented architecture, validation, centralized error handling, and API testing.",
    tags: ["Node.js", "Express.js", "REST API", "JavaScript", "Postman"],
    content: [
      {
        type: "heading",
        text: "REST API Fundamentals & Server Setup"
      },
      {
        type: "paragraph",
        text: "Representational State Transfer (REST) is the architectural standard of modern web services. In this project, I developed a modular backend API using Node.js and Express.js. The application acts as a clean, stateless server that interacts with consumers using structured JSON payloads. I initialized the Express server with essential middleware to handle CORS, parsing, and request logging:"
      },
      {
        type: "code",
        language: "javascript",
        code: `const express = require('express');
const cors = require('cors');
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`
      },
      {
        type: "heading",
        text: "API Routes & CRUD Architecture"
      },
      {
        type: "paragraph",
        text: "The routing structure is modular, separating endpoints by resource. Using Express Routers, I established routes for handling typical CRUD (Create, Read, Update, Delete) operations. For example, requests targeting projects are routed via \`/api/projects\` using standard HTTP methods:"
      },
      {
        type: "list",
        items: [
          "GET /api/projects - Retrieve a list of all projects",
          "GET /api/projects/:id - Retrieve details of a specific project",
          "POST /api/projects - Create a new project (restricted to admin)",
          "PUT /api/projects/:id - Update an existing project",
          "DELETE /api/projects/:id - Remove a project"
        ]
      },
      {
        type: "heading",
        text: "Request Validation & Centralized Error Handling"
      },
      {
        type: "paragraph",
        text: "Robust APIs must guard against invalid inputs. I wrote validation middleware that checks incoming payloads before letting the controller process them. Furthermore, to prevent server crashes and keep the code clean, I built a centralized error handler. Unhandled errors are automatically formatted and returned with accurate HTTP status codes:"
      },
      {
        type: "code",
        language: "javascript",
        code: `// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});`
      },
      {
        type: "heading",
        text: "API Testing with Postman"
      },
      {
        type: "paragraph",
        text: "To verify routing logic, header manipulation, and payload structures, I built automated test scripts in Postman. I structured tests into Collections to cover happy paths (e.g. creating valid projects) and edge cases (e.g. submitting empty forms or accessing protected resources without an admin token). These test suites confirm that the REST API responds correctly before frontend integration begins."
      },
      {
        type: "heading",
        text: "Key Takeaways and Lessons Learned"
      },
      {
        type: "list",
        items: [
          "Separation of concerns (routers vs controllers) is vital to preventing controller files from growing too large.",
          "Centralized error handling avoids repetitive try-catch blocks and maintains a consistent response format for clients.",
          "Thorough API test suites in Postman speed up development by catching regression bugs instantly during code refactoring."
        ]
      }
    ]
  },
  {
    id: "mongodb-integration",
    title: "Integrating MongoDB with a Node.js REST API",
    category: "Backend & Database",
    readTime: "7 min read",
    description: "Exploring the development of a database-integrated User Management API using Node.js, Express.js, MongoDB, and Mongoose for persistent data storage, schema validation, and complete CRUD operations.",
    tags: ["Node.js", "Express.js", "MongoDB", "MongoDB Atlas", "Mongoose", "REST API", "Postman"],
    content: [
      {
        type: "heading",
        text: "The Value of Persistent Data Storage"
      },
      {
        type: "paragraph",
        text: "For application state to persist across server restarts or container rebuilds, data must reside in a dedicated, durable storage engine. MongoDB, a Document-oriented NoSQL database, was chosen for this user management system. Its schema-less flexibility allows rapid iteration on user profiles, storing records as JSON-like documents."
      },
      {
        type: "heading",
        text: "MongoDB Atlas & Mongoose Connection"
      },
      {
        type: "paragraph",
        text: "I set up a database cluster in MongoDB Atlas (a fully managed cloud service) and connected it to the Node.js API using Mongoose, an Object Data Modeling (ODM) library. Mongoose manages connections, connection pooling, and translates database records into JavaScript objects:"
      },
      {
        type: "code",
        language: "javascript",
        code: `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Connection Error: \${error.message}\`);
    process.exit(1);
  }
};`
      },
      {
        type: "heading",
        text: "Schema Design & Validation with Mongoose"
      },
      {
        type: "paragraph",
        text: "Although MongoDB is schema-less, applications require structured models to prevent dirty data. Mongoose schemas solve this by validating document properties at the application level before writing them to the database. Here is the model definition for the user management API:"
      },
      {
        type: "code",
        language: "javascript",
        code: `const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\\S+@\\S+\\.\\S+/, 'Please use a valid email address']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);`
      },
      {
        type: "heading",
        text: "Connecting API Routes with Database Operations"
      },
      {
        type: "paragraph",
        text: "With the Schema in place, database operations are integrated into API routes. I implemented database querying helper methods to execute CRUD operations cleanly:"
      },
      {
        type: "list",
        items: [
          "CREATE: Using \`User.create(req.body)\` to instantiate and validate new users.",
          "READ: Using \`User.find()\` to fetch all users, and \`User.findById(id)\` to retrieve specific accounts.",
          "UPDATE: Using \`User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })\` to safely update profiles and apply validation checks to edits.",
          "DELETE: Using \`User.findByIdAndDelete(id)\` to delete accounts."
        ]
      },
      {
        type: "heading",
        text: "Database Verification with Postman"
      },
      {
        type: "paragraph",
        text: "Postman requests were created to test database integration. Tests verified that duplicate users triggered unique constraint errors, empty payloads failed validation checks with a 400 status, and successful edits updated the persistent documents in MongoDB Atlas immediately."
      },
      {
        type: "heading",
        text: "Key Takeaways and Lessons Learned"
      },
      {
        type: "list",
        items: [
          "Configuring Mongoose validator rules (like \`runValidators: true\` on updates) is crucial to keeping data clean.",
          "Handling database errors (such as MongoDB error code 11000 for duplicate fields) requires custom middleware mapping.",
          "Using Atlas cluster instances simplifies deployment operations, freeing up time to focus on backend architecture."
        ]
      }
    ]
  },
  {
    id: "taskpilot-productivity",
    title: "Building TaskPilot — A Modern Productivity Web App",
    category: "Web Development",
    readTime: "8 min read",
    description: "Building a modern productivity-focused To-Do List application designed to help users organize tasks, manage priorities, track deadlines, and stay productive through a clean and responsive interface.",
    tags: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Responsive Design"],
    content: [
      {
        type: "heading",
        text: "The Purpose of TaskPilot"
      },
      {
        type: "paragraph",
        text: "Productivity web apps are only useful if they are fast, intuitive, and easy to interact with. TaskPilot was built to give users a distraction-free environment to schedule tasks, filter lists by priority or category, and view completion metrics in real time. It was built entirely using vanilla frontend technologies (HTML5, CSS3, and JavaScript) to prove that high-fidelity web interfaces do not require complex frameworks."
      },
      {
        type: "heading",
        text: "Core Features & Operations"
      },
      {
        type: "paragraph",
        text: "TaskPilot supports full local task management. Users can create tasks, mark them as completed, assign priorities (High, Medium, Low), categorize items (Work, Personal, Studies), and set due dates. The DOM updates dynamically when tasks are added, edited, or deleted, utilizing an array-based state model in JavaScript:"
      },
      {
        type: "code",
        language: "javascript",
        code: `// Task State Management
let tasks = [];

function addTask(title, category, priority, dueDate) {
  const newTask = {
    id: Date.now().toString(),
    title,
    category,
    priority,
    dueDate,
    completed: false
  };
  tasks.push(newTask);
  saveTasksToLocalStorage();
  renderTasks();
}`
      },
      {
        type: "heading",
        text: "Search, Filtering, and Sorting"
      },
      {
        type: "paragraph",
        text: "To handle large task lists, I built search and filtering functions. Users can search task titles using keywords and filter by completion status, category, or priority. Tasks can also be sorted chronologically by due date or ranked by priority severity, allowing users to focus on urgent work."
      },
      {
        type: "heading",
        text: "State Persistence & Light/Dark Theme"
      },
      {
        type: "paragraph",
        text: "To ensure user data is not lost on reload, the application persists the task list and user preferences (such as light/dark mode) using standard browser Local Storage. When the app initializes, it loads existing tasks and applies the saved theme state:"
      },
      {
        type: "code",
        language: "javascript",
        code: `// Local Storage Syncing
function saveTasksToLocalStorage() {
  localStorage.setItem('taskpilot_tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem('taskpilot_tasks');
  tasks = data ? JSON.parse(data) : [];
  renderTasks();
}`
      },
      {
        type: "heading",
        text: "UX, Accessibility & Responsive Design"
      },
      {
        type: "paragraph",
        text: "Responsive design ensures that TaskPilot operates on smartphones, tablets, and desktops. The layout uses flexible grids and viewport-relative units to adapt. I prioritized keyboard accessibility: input forms can be submitted via the Enter key, task cards are focusable, and buttons have visible focus rings. ARIA labels are also present on action icons to assist screen reader users."
      },
      {
        type: "heading",
        text: "Key Takeaways and Lessons Learned"
      },
      {
        type: "list",
        items: [
          "Vanilla state-to-DOM sync is an excellent exercise that highlights how modern reactive libraries handle rendering under the hood.",
          "Local Storage provides low-overhead persistence for local applications, though data migration structures are important.",
          "Keyboard shortcuts and clear ARIA descriptions dramatically improve the overall user experience."
        ]
      }
    ]
  },
  {
    id: "u2-collective-hr-portal-blog",
    title: "Building a Modern HR Management Portal for U2 Collective",
    category: "FULL STACK DEVELOPMENT",
    readTime: "6 min read",
    description: "Exploring the development of a modern HR management portal designed to simplify employee management, attendance tracking, leave management, performance monitoring, and document handling through a centralized interface.",
    tags: ["React", "Node.js", "Express.js", "Supabase", "PostgreSQL"],
    content: [
      {
        type: "heading",
        text: "Introduction"
      },
      {
        type: "paragraph",
        text: "The U2 Collective HR Portal is a centralized web-based HR management system designed to help organizations manage employee information and everyday HR operations through a structured digital platform."
      },
      {
        type: "heading",
        text: "Project Overview"
      },
      {
        type: "paragraph",
        text: "The portal provides separate experiences for administrators and employees. Administrators can manage employee records and HR-related operations, while employees can access their relevant information and essential workplace features through their dashboard."
      },
      {
        type: "heading",
        text: "Key Functionality"
      },
      {
        type: "list",
        items: [
          "Employee record management",
          "Employee profile information",
          "Attendance management",
          "Leave management",
          "Performance management",
          "Employee document management",
          "Admin dashboard",
          "Employee dashboard",
          "Company announcements",
          "Calendar and weather information",
          "Secure role-based access",
          "Database-backed data management"
        ]
      },
      {
        type: "heading",
        text: "Employee Dashboard"
      },
      {
        type: "paragraph",
        text: "The employee dashboard is intentionally focused on essential employee information and workplace utilities."
      },
      {
        type: "paragraph",
        text: "Employees can access:"
      },
      {
        type: "list",
        items: [
          "Their assigned profile information",
          "Attendance information",
          "Calendar",
          "Weather",
          "Company announcements"
        ]
      },
      {
        type: "paragraph",
        text: "Employees cannot modify their assigned personal information. Employee details such as name and email are controlled by the administrator."
      },
      {
        type: "heading",
        text: "Technical Implementation"
      },
      {
        type: "paragraph",
        text: "The project uses React for the frontend interface and Node.js with Express.js for backend API functionality."
      },
      {
        type: "paragraph",
        text: "Supabase/PostgreSQL is used for persistent data storage and backend-related services."
      },
      {
        type: "paragraph",
        text: "The application follows a modular architecture separating frontend components, backend routes/controllers, database operations, and authentication/authorization logic."
      },
      {
        type: "heading",
        text: "Project Highlights"
      },
      {
        type: "list",
        items: [
          "Responsive HR management interface",
          "Separate administrator and employee experiences",
          "Structured employee management",
          "Attendance workflow",
          "Leave and performance management",
          "Document management",
          "Database integration",
          "Role-based access control",
          "Clean and modular application architecture",
          "Modern responsive UI"
        ]
      },
      {
        type: "heading",
        text: "Outcome"
      },
      {
        type: "paragraph",
        text: "The project demonstrates my ability to develop a practical full-stack web application that combines frontend development, backend APIs, database integration, authentication, role-based functionality, and responsive user interface design."
      }
    ]
  }
];
