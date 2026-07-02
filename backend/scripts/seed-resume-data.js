import { supabaseAdmin } from '../config/supabase.js'

const now = () => new Date().toISOString()

const upsertSingle = async (table, data) => {
  const { data: existing, error: selectError } = await supabaseAdmin
    .from(table)
    .select('id')
    .limit(1)
    .maybeSingle()

  if (selectError) throw selectError

  if (existing?.id) {
    const { error } = await supabaseAdmin
      .from(table)
      .update({ ...data, updated_at: now() })
      .eq('id', existing.id)
    if (error) throw error
    return
  }

  const { error } = await supabaseAdmin.from(table).insert(data)
  if (error) throw error
}

const replaceByColumn = async (table, column, values, rows) => {
  const { error: deleteError } = await supabaseAdmin
    .from(table)
    .delete()
    .in(column, values)

  if (deleteError) throw deleteError

  if (rows.length) {
    const { error: insertError } = await supabaseAdmin.from(table).insert(rows)
    if (insertError) throw insertError
  }
}

const skills = [
  { name: 'HTML5', category: 'frontend', proficiency: 92, is_featured: true },
  { name: 'CSS3', category: 'frontend', proficiency: 88, is_featured: true },
  { name: 'JavaScript', category: 'frontend', proficiency: 82, is_featured: true },
  { name: 'Responsive Web Design', category: 'frontend', proficiency: 88, is_featured: true },
  { name: 'Bootstrap', category: 'frontend', proficiency: 80, is_featured: true },
  { name: 'UI/UX Fundamentals', category: 'frontend', proficiency: 76, is_featured: false },
  { name: 'Git', category: 'tools', proficiency: 78, is_featured: true },
  { name: 'GitHub', category: 'tools', proficiency: 78, is_featured: true },
  { name: 'Communication', category: 'soft_skills', proficiency: 85, is_featured: false },
  { name: 'Teamwork', category: 'soft_skills', proficiency: 86, is_featured: false },
  { name: 'Problem Solving', category: 'soft_skills', proficiency: 84, is_featured: true },
].map((skill, index) => ({ ...skill, order_index: index }))

const suggestedSkills = [
  { name: 'React.js', category: 'frontend', proficiency: 70, is_featured: true },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 68, is_featured: true },
  { name: 'Node.js', category: 'backend', proficiency: 65, is_featured: true },
  { name: 'Express.js', category: 'backend', proficiency: 64, is_featured: true },
  { name: 'Supabase', category: 'database', proficiency: 62, is_featured: true },
  { name: 'PostgreSQL', category: 'database', proficiency: 58, is_featured: false },
  { name: 'REST APIs', category: 'backend', proficiency: 66, is_featured: false },
  { name: 'JWT Authentication', category: 'backend', proficiency: 60, is_featured: false },
  { name: 'Vercel Deployment', category: 'tools', proficiency: 62, is_featured: false },
  { name: 'Framer Motion', category: 'frontend', proficiency: 55, is_featured: false },
  { name: 'GSAP', category: 'frontend', proficiency: 52, is_featured: false },
].map((skill, index) => ({ ...skill, order_index: skills.length + index }))

const projects = [
  {
    title: 'E-commerce Website',
    slug: 'e-commerce-website',
    category: 'Frontend',
    short_description: 'A responsive e-commerce interface with a modern layout and user-friendly shopping experience.',
    description: 'Built a responsive e-commerce website using HTML, CSS, JavaScript, and Bootstrap. The project focuses on clean product presentation, mobile-friendly layouts, and a modern interface.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: ['Responsive design', 'Modern user-friendly interface', 'Product-focused layout'],
    status: 'completed',
    tags: ['ecommerce', 'frontend', 'responsive'],
    is_featured: true,
    order_index: 0,
  },
  {
    title: 'Login Form',
    slug: 'login-form',
    category: 'Frontend',
    short_description: 'A responsive login form with basic validation and a clean user interface.',
    description: 'Created a responsive login form using HTML, CSS, and JavaScript. The form includes basic validation and a polished layout for common authentication screens.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['Responsive login form', 'Basic form validation', 'Clean authentication UI'],
    status: 'completed',
    tags: ['form', 'validation', 'frontend'],
    is_featured: true,
    order_index: 1,
  },
  {
    title: 'Premium Portfolio Website',
    slug: 'premium-portfolio-website',
    category: 'Full Stack',
    short_description: 'A React, Node.js, and Supabase portfolio with an admin dashboard and dynamic content.',
    description: 'A premium portfolio project built with React, Node.js, Express, Supabase, Tailwind CSS, JWT authentication, and Vercel-ready deployment.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'Tailwind CSS', 'JWT'],
    features: ['Admin dashboard', 'Dynamic portfolio content', 'Supabase database integration', 'JWT-secured admin routes'],
    status: 'in_progress',
    tags: ['portfolio', 'react', 'node', 'supabase'],
    is_featured: true,
    order_index: 2,
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institute: 'COMSATS University Islamabad, Vehari Campus (CUI)',
    field_of_study: 'Computer Science',
    start_date: '2023-01-01',
    end_date: '2027-12-31',
    is_current: true,
    description: 'Currently pursuing a BSCS degree with a focus on computer science fundamentals and web development.',
    location: 'Vehari, Pakistan',
    order_index: 0,
  },
  {
    degree: 'Intermediate',
    institute: 'Punjab Group of Colleges, Mailsi',
    start_date: '2020-01-01',
    end_date: '2022-12-31',
    is_current: false,
    description: 'Completed intermediate education before starting the BSCS program.',
    location: 'Mailsi, Pakistan',
    order_index: 1,
  },
  {
    degree: 'Matriculation',
    institute: 'Government High School, Mailsi',
    start_date: '2019-01-01',
    end_date: '2020-12-31',
    is_current: false,
    description: 'Completed matriculation education.',
    location: 'Mailsi, Pakistan',
    order_index: 2,
  },
]

const socialLinks = [
  {
    platform: 'email',
    url: 'mailto:hassaanashfaq51@gmail.com',
    icon: 'mail',
    label: 'Email',
    is_active: true,
    order_index: 0,
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/in/m-hassaan-578455408',
    icon: 'linkedin',
    label: 'LinkedIn',
    is_active: true,
    order_index: 1,
  },
  {
    platform: 'phone',
    url: 'tel:+923116647440',
    icon: 'phone',
    label: 'Phone',
    is_active: true,
    order_index: 2,
  },
]

const services = [
  {
    title: 'Responsive Web Development',
    short_description: 'Mobile-first websites built with clean HTML, CSS, JavaScript, and Bootstrap.',
    description: 'I build responsive websites that adapt smoothly across devices and provide clear, user-friendly interfaces.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    features: ['Mobile-first layouts', 'Clean UI implementation', 'Responsive sections'],
    is_featured: true,
    is_active: true,
    order_index: 0,
  },
  {
    title: 'Frontend UI Implementation',
    short_description: 'Polished frontend interfaces focused on usability and visual clarity.',
    description: 'I turn layouts and ideas into interactive frontend experiences with attention to spacing, accessibility, and usability.',
    technologies: ['JavaScript', 'Bootstrap', 'Responsive Web Design', 'UI/UX Fundamentals'],
    features: ['Modern interfaces', 'Reusable layouts', 'Basic form validation'],
    is_featured: true,
    is_active: true,
    order_index: 1,
  },
]

const run = async () => {
  await upsertSingle('hero', {
    name: 'M. Hassaan',
    tagline: 'Web Developer',
    subtitle: 'Computer Science Student and Web Developer',
    description: 'Innovative and detail-oriented Computer Science student with a strong passion for web development. I enjoy building responsive, user-friendly web experiences with HTML, CSS, JavaScript, and modern web tools.',
    profile_image: '/Hassan.png',
    cta_primary_text: 'View Projects',
    cta_primary_link: '/projects',
    cta_secondary_text: 'Contact Me',
    cta_secondary_link: '/contact',
    typing_words: ['Web Developer', 'Computer Science Student', 'Frontend Developer', 'Problem Solver'],
    stats: [
      { label: 'Projects', value: '3+' },
      { label: 'Core Skills', value: '11+' },
      { label: 'Education', value: 'BSCS' },
    ],
  })

  await upsertSingle('about', {
    biography: 'I am M. Hassaan, a Computer Science student and web developer passionate about creating responsive, engaging, and user-friendly digital experiences.',
    personal_story: 'My current focus is strengthening my frontend skills while growing into full-stack development with React, Node.js, Express, Supabase, and modern deployment workflows.',
    mission: 'To build clean, responsive, and practical web experiences that help users complete their goals with ease.',
    vision: 'To keep growing as a full-stack developer and contribute to meaningful web products in fast-paced teams.',
    career_goals: 'Advance from strong frontend foundations into full-stack development using React, Node.js, Supabase, REST APIs, authentication, and deployment best practices.',
    image: '/Hassan.png',
    years_of_experience: 1,
    projects_completed: 3,
    clients_served: 0,
    achievements: [
      'Built responsive web projects with HTML, CSS, JavaScript, and Bootstrap.',
      'Currently pursuing a BSCS degree at COMSATS University Islamabad, Vehari Campus.',
      'Actively expanding into React, Node.js, Express, Supabase, and modern full-stack workflows.',
    ],
    timeline: [
      { year: '2020', title: 'Completed Matriculation', description: 'Government High School, Mailsi' },
      { year: '2022', title: 'Completed Intermediate', description: 'Punjab Group of Colleges, Mailsi' },
      { year: '2023', title: 'Started BSCS', description: 'COMSATS University Islamabad, Vehari Campus' },
    ],
  })

  await upsertSingle('settings', {
    site_title: 'M. Hassaan Portfolio',
    site_description: 'Web Developer portfolio focused on responsive websites, frontend development, and modern full-stack growth.',
    footer_text: `Copyright ${new Date().getFullYear()} M. Hassaan. All rights reserved.`,
    theme: 'dark',
    primary_color: '#6C63FF',
    accent_color: '#2CB67D',
  })

  await upsertSingle('seo', {
    meta_title: 'M. Hassaan | Web Developer Portfolio',
    meta_description: 'Portfolio of M. Hassaan, a Computer Science student and web developer building responsive websites with HTML, CSS, JavaScript, Bootstrap, React, Node.js, and Supabase.',
    keywords: 'M Hassaan, web developer, portfolio, HTML, CSS, JavaScript, Bootstrap, React, Node.js, Supabase, COMSATS',
    og_title: 'M. Hassaan | Web Developer',
    og_description: 'Computer Science student and web developer focused on responsive, user-friendly web experiences.',
    robots: 'index, follow',
  })

  await replaceByColumn('skills', 'name', [...skills, ...suggestedSkills].map(skill => skill.name), [...skills, ...suggestedSkills])
  await replaceByColumn('projects', 'slug', projects.map(project => project.slug), projects)
  await replaceByColumn('education', 'institute', education.map(item => item.institute), education)
  await replaceByColumn('social_links', 'platform', socialLinks.map(link => link.platform), socialLinks)
  await replaceByColumn('services', 'title', services.map(service => service.title), services)

  console.log('Resume portfolio data seeded successfully.')
}

run().catch(error => {
  console.error(error.message)
  process.exit(1)
})
