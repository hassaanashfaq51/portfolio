import dotenv from 'dotenv';

dotenv.config();

// Knowledge Base containing all information in the portfolio
const KNOWLEDGE_BASE = {
  about: `Muhammad Hassaan is a dedicated Full-Stack Developer committed to building clean, high-performance, and scalable digital solutions. Specializing in the JavaScript/Node.js ecosystem, he leverages React.js for clean UI structures and Express for backend microservices, unified under Supabase serverless databases. He operates with a problem-solving mindset, writing maintainable code that delivers exceptional user experiences.`,
  
  approach: `Muhammad Hassaan's development approach centers on writing production-ready code, setting up secure APIs, deploying auto-indexing database schemas, and building responsive, high-fidelity user interfaces and smooth animations using Framer Motion.`,
  
  stats: `Muhammad Hassaan has completed 15+ production projects, works with 14+ core technologies, and has a dedicated industry focus on Full-Stack Development.`,
  
  education: `Muhammad Hassaan holds a Bachelor of Science in Computer Science from COMSATS University Islamabad. His academic curriculum focused on advanced computing topics, system designs, software engineering methodology, and web stack infrastructure.`,
  
  skills: `Muhammad Hassaan's technical expertise and skills include:
- Frontend: React.js, HTML5, CSS3, Tailwind CSS
- Backend & Database: Node.js, Express.js, Supabase, PostgreSQL
- Languages: JavaScript, Python, C++, Dart
- Mobile: Flutter
- Version Control & Tools: Git, GitHub`,
  
  projects: `Muhammad Hassaan has built several high-quality projects, including:
1. **U2 Collective HR Management Portal**: A full-stack HR and employee management portal featuring payroll generation, interactive analytics dashboards, and role-based access control. Technologies: React.js, Node.js, Supabase. (Live: https://u2-collective-portal-hqk8.vercel.app | GitHub: https://github.com/hassaanashfaq51/u2-collective-portal)
2. **Task Manager Mobile Application**: An offline-first mobile scheduling application featuring progress tracking charts, local push notifications, and SQLite database persistence. Technologies: Flutter, Dart, SQLite. (GitHub: https://github.com/hassaanashfaq51/flutter-taskmanager)
3. **Ecommerce Websites**: A high-performance e-commerce platform offering an interactive shopping cart, Stripe payment API integration, product filters, and catalog search. Technologies: React.js, Tailwind CSS, Node.js, Express.js. (Live: https://shop.hassaan.dev | GitHub: https://github.com/hassaanashfaq51/ecommerce-platform)`,
  
  experience: `Muhammad Hassaan's development journey consists of four key phases:
- **Phase 01: Started software development journey**: Began exploring software engineering paradigms, mastering programming languages, data structures, OOP principles, and basic algorithm design.
- **Phase 02: Learned modern technologies**: Focused on frontend engineering and mobile frameworks, mastering React.js, Tailwind CSS, Flutter, Dart, and responsive mobile/web layout systems.
- **Phase 03: Built full-stack applications**: Integrated client-server architectures, designing backend microservices with Node.js and Express.js, and deploying cloud datastores like Supabase & PostgreSQL.
- **Phase 04: Developed real-world projects**: Engineered and deployed complete software products for production, integrating payment gateways, robust auth flows, role-based controls, and client dashboards.`,
  
  services: `Muhammad Hassaan offers professional services and technical consultations, specializing in:
- Web Application Development
- Mobile Application Development (Flutter)
- E-Commerce Platform Setup
- Custom Database Integration (Supabase / PostgreSQL)
- API Development & Backend Routing
- Other Technical Consultations (Free free to request a free consultation!)`,
  
  contact: `You can reach out to Muhammad Hassaan through the following channels:
- Email: hassanashfaq51@gmail.com
- WhatsApp / Phone: +92 311 6647440 (wa.me/923116647440)
- LinkedIn: linkedin.com/in/m-hassaan-57845508 (https://linkedin.com/in/m-hassaan-57845508)
- GitHub: github.com/hassaanashfaq51 (https://github.com/hassaanashfaq51)`,
  
  resume: `You can download Muhammad Hassaan's professional resume from this link: /assets/Muhammad_Hassaan_Resume.pdf`
};

// Polite refusal response for out-of-scope questions
const REFUSAL_RESPONSE = `I’m the Portfolio Assistant for Hassaan’s portfolio. I can only answer questions related to this portfolio, including skills, projects, education, experience, and contact information.`;

// Local NLP/rule-based matching system
const getLocalResponse = (message) => {
  const cleanMsg = message.toLowerCase().trim();

  // 1. Handle Greetings
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'hola', 'good morning', 'good afternoon', 'good evening', 'who are you', 'what is your name'];
  if (greetings.some(g => cleanMsg === g || cleanMsg.startsWith(g + ' ') || cleanMsg.includes('who are you') || cleanMsg.includes('your name'))) {
    return `Hi! I’m Hassaan’s Portfolio Assistant. Ask me anything about my skills, projects, education, or experience.`;
  }

  // 2. Identify explicit out-of-scope triggers
  // Out-of-scope topics check (tutorial, programming advice, weather, jokes, math, general queries)
  const outOfScopeKeywords = [
    'write a program', 'write a function', 'write code', 'how to code', 'teach me', 'explain quicksort', 'implement a',
    'what is 2', 'what is 1', 'solve', 'equation', 'formula', 'joke', 'tell a joke', 'funny story',
    'weather', 'rain', 'temperature', 'forecast', 'capital of', 'president of', 'economy', 'news today',
    'what is the meaning of', 'how to write a', 'explain to me', 'give me a recipe', 'how does python work'
  ];

  // Specific check for coding/technical requests that are NOT about Hassaan's skills
  const isCodingRequest = (cleanMsg.includes('code') || cleanMsg.includes('program') || cleanMsg.includes('function') || cleanMsg.includes('write')) &&
                          !cleanMsg.includes('your') && !cleanMsg.includes('hassaan') && !cleanMsg.includes('skills') && !cleanMsg.includes('project');

  if (outOfScopeKeywords.some(keyword => cleanMsg.includes(keyword)) || isCodingRequest) {
    return REFUSAL_RESPONSE;
  }

  // 3. Score categories for portfolio-related match
  const scores = {
    about: 0,
    education: 0,
    skills: 0,
    projects: 0,
    experience: 0,
    services: 0,
    contact: 0,
    resume: 0
  };

  // Keywords for About
  const aboutKeywords = ['who is', 'background', 'profile', 'biography', 'summary', 'introduce', 'who are you'];
  aboutKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.about += 2;
  });
  if (cleanMsg.includes('about') || cleanMsg.includes('hassaan')) {
    scores.about += 1;
  }

  // Keywords for Education
  const eduKeywords = ['education', 'comsats', 'study', 'university', 'degree', 'college', 'academic', 'qualification', 'graduated', 'major', 'learn'];
  eduKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.education += 2;
  });

  // Keywords for Skills
  const skillsKeywords = ['skill', 'technology', 'technologies', 'programming language', 'frontend', 'backend', 'database', 'stack', 'languages', 'framework', 'react', 'node', 'supabase', 'javascript', 'html', 'css', 'tailwind', 'flutter', 'python', 'c++', 'git', 'github'];
  skillsKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.skills += 2;
  });

  // Keywords for Projects
  const projectsKeywords = ['project', 'u2 collective', 'hr portal', 'task manager', 'ecommerce', 'built', 'developed', 'deployed', 'work sample', 'portfolio project'];
  projectsKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.projects += 2;
  });

  // Keywords for Experience
  const expKeywords = ['experience', 'journey', 'timeline', 'accomplishment', 'milestone', 'career', 'phase', 'work history', 'job'];
  expKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.experience += 2;
  });

  // Keywords for Services
  const servicesKeywords = ['service', 'consultation', 'book', 'hire', 'contract', 'freelance', 'work together', 'collaborate', 'help me with', 'offer'];
  servicesKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.services += 2;
  });

  // Keywords for Contact
  const contactKeywords = ['contact', 'email', 'phone', 'call', 'reach', 'linkedin', 'social', 'address', 'location', 'live in', 'message', 'number'];
  contactKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.contact += 2;
  });

  // Keywords for Resume
  const resumeKeywords = ['resume', 'cv', 'download', 'pdf', 'resume.pdf'];
  resumeKeywords.forEach(kw => {
    if (cleanMsg.includes(kw)) scores.resume += 2;
  });

  // Find category with highest score
  let bestCategory = null;
  let highestScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    } else if (score === highestScore && highestScore > 0 && category !== 'about') {
      // Prefer specific category over generic 'about' in case of tie
      bestCategory = category;
    }
  }

  // Return best matched response if above threshold
  if (highestScore >= 2 && bestCategory) {
    // If asking about a specific skill, but it was just a general mention, double check if it was actually a coding tutorial ask
    if (bestCategory === 'skills' && (cleanMsg.includes('write') || cleanMsg.includes('how to') || cleanMsg.includes('create'))) {
      return REFUSAL_RESPONSE;
    }

    if (bestCategory === 'about') {
      return KNOWLEDGE_BASE.about + '\n\n' + KNOWLEDGE_BASE.approach;
    }
    return KNOWLEDGE_BASE[bestCategory];
  }

  // 4. Default Handle Unknown Questions: check if it contains any portfolio terms
  const portfolioTerms = ['hassaan', 'about', 'skills', 'projects', 'education', 'experience', 'contact', 'resume', 'cv', 'services', 'hire', 'developer'];
  const mentionsPortfolio = portfolioTerms.some(term => cleanMsg.includes(term));

  if (mentionsPortfolio) {
    return `I am Hassaan's Portfolio Assistant. I don't have information about that specific query in the portfolio. You can ask me about Hassaan's skills, projects, education, experience, or contact details.`;
  } else {
    // Treat completely random/unknown topics as out-of-scope refusal
    return REFUSAL_RESPONSE;
  }
};

// POST /api/chat controller handler
export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const portfolioContext = JSON.stringify(KNOWLEDGE_BASE);
        const systemPrompt = `You are Muhammad Hassaan's Portfolio Assistant. Your task is to answer user queries using ONLY the following portfolio details:
${portfolioContext}

Strict constraints:
1. ONLY answer questions related to Hassaan's portfolio (skills, projects, education, experience, contact info, resume).
2. If the user asks anything outside Hassaan's portfolio (such as general programming tutorials, writing code, mathematics, current events, jokes, weather, general knowledge, etc.), you MUST politely refuse by saying EXACTLY:
"${REFUSAL_RESPONSE}"
3. Do not generate unrelated responses under any circumstances. Keep your answers concise, accurate, and professional. Use natural, direct responses.`;

        // Direct HTTP call to Gemini API to avoid dependency installation issues
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    { text: systemPrompt },
                    { text: `User message: ${message}` }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({ response: replyText.trim() });
          }
        }
        
        console.warn('Gemini API call failed or returned empty. Falling back to local NLP matching.');
      } catch (geminiError) {
        console.error('Error invoking Gemini API:', geminiError.message);
      }
    }

    // Default local matching response fallback
    const localReply = getLocalResponse(message);
    return res.json({ response: localReply });

  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
};
