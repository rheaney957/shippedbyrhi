import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, CheckCircle } from 'lucide-react'

const projectData: Record<string, any> = {
  'the-academy-dublin': {
    id: 'the-academy-dublin',
    title: 'The Academy Dublin',
    subtitle: 'Live Music & Entertainment Venue',
    description: 'A modern website for The Academy Dublin, a popular live music and entertainment venue in Dublin city centre.',
    longDescription: 'Built a fully responsive, high-performance website for The Academy Dublin — one of Dublin\'s most popular live music and entertainment venues. The site showcases upcoming events, venue information, and ticketing details with a focus on speed, accessibility, and a great user experience across all devices.',
    image: '/images/academy.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    category: 'Freelance',
    duration: 'Freelance project',
    role: 'Frontend Developer',
    liveUrl: 'https://www.theacademydublin.com/',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Responsive design optimised for mobile and desktop',
      'Event listings and venue information',
      'Fast page loads with modern build tooling',
      'SEO-friendly structure',
      'Accessible and intuitive navigation',
      'Modern, visually engaging design',
    ],
  },
  'limelight-belfast': {
    id: 'limelight-belfast',
    title: 'Limelight Belfast',
    subtitle: 'Iconic Live Music Venue & Nightclub',
    description: 'Website for Limelight Belfast, an iconic live music venue and nightclub in the heart of Belfast.',
    longDescription: 'Developed a modern website for Limelight Belfast, one of Northern Ireland\'s most iconic live music venues and nightclubs. The site serves as the central hub for event listings, ticket purchases, and venue information, built with performance and user experience as top priorities.',
    image: '/images/limelight.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    category: 'Freelance',
    duration: 'Freelance project',
    role: 'Frontend Developer',
    liveUrl: 'https://www.limelightbelfast.com/',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Event listings and ticket integration',
      'Responsive layout for all screen sizes',
      'Performance-optimised with modern tooling',
      'Clear venue and contact information',
      'Engaging visual design reflecting the venue brand',
      'Accessible navigation and content structure',
    ],
  },
  'nicomedy': {
    id: 'nicomedy',
    title: 'NI Comedy',
    subtitle: 'Northern Ireland Comedy Scene',
    description: 'A website for Northern Ireland\'s comedy scene, showcasing events, comedians, and upcoming shows.',
    longDescription: 'Created a website for Northern Ireland\'s comedy community, providing a central platform for comedy events, comedian profiles, and show listings across the region. The site makes it easy for comedy fans to discover what\'s on and where.',
    image: '/images/nicomedy.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    category: 'Freelance',
    duration: 'Freelance project',
    role: 'Frontend Developer',
    liveUrl: 'https://www.nicomedy.co.uk/',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Event discovery and show listings',
      'Comedian profiles and information',
      'Mobile-first responsive design',
      'Fast, lightweight page loads',
      'Clean and intuitive user interface',
      'SEO optimised for local search',
    ],
  },
  'emerge-belfast': {
    id: 'emerge-belfast',
    title: 'Emerge Belfast',
    subtitle: 'Creative Events & Entertainment',
    description: 'Website for Emerge Belfast, a creative events and entertainment company bringing unique experiences to the city.',
    longDescription: 'Built a website for Emerge Belfast, a creative events and entertainment company. The site showcases their portfolio of events, provides information about upcoming experiences, and serves as a professional online presence for the brand.',
    image: '/images/emerge.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    category: 'Freelance',
    duration: 'Freelance project',
    role: 'Frontend Developer',
    liveUrl: 'https://www.emergebelfast.com/',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Event showcase and portfolio',
      'Responsive design across all devices',
      'Brand-aligned visual design',
      'Contact and booking information',
      'Performance optimised',
      'Clean, modern user interface',
    ],
  },
  'midaz-pms': {
    id: 'midaz-pms',
    title: 'Midaz PMS',
    subtitle: 'Property Management Software',
    description: 'A professional website for Midaz PMS, a property management software solution.',
    longDescription: 'Developed a professional marketing website for Midaz PMS, a property management software platform. The site clearly communicates the product\'s value proposition, features, and pricing to potential customers, with a focus on conversion and clear information architecture.',
    image: '/images/midazpms.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design'],
    category: 'Freelance',
    duration: 'Freelance project',
    role: 'Frontend Developer',
    liveUrl: 'https://www.midazpms.com/',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Clear product feature presentation',
      'Responsive and professional design',
      'Conversion-focused layout',
      'Fast page load performance',
      'Accessible content structure',
      'Contact and demo request forms',
    ],
  },
  'portfolio-website': {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Personal Portfolio & Showcase',
    description: 'This portfolio site — a modern, responsive website built with React and TypeScript.',
    longDescription: 'Designed and built this personal portfolio website to showcase my freelance work and professional experience. Features smooth animations with Framer Motion, responsive design with Tailwind CSS, and fast performance with Vite.',
    image: '/images/shippedbyrhi.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'React Router'],
    category: 'Personal',
    duration: 'Personal project',
    role: 'Designer & Developer',
    liveUrl: 'https://www.shippedbyrhi.com',
    githubUrl: 'https://github.com/rheaney957',
    features: [
      'Smooth page transitions with Framer Motion',
      'Fully responsive across all devices',
      'Fast builds with Vite',
      'Project filtering and search',
      'Clean, modern design',
      'Accessible and SEO-friendly',
    ],
  },
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()

  if (!projectId || !projectData[projectId]) {
    return <Navigate to="/projects" replace />
  }

  const project = projectData[projectId]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-dark-900">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {project.subtitle}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Live Site
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                    <span><strong>Type:</strong> {project.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-primary-600" />
                    <span><strong>Role:</strong> {project.role}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold font-heading mb-8 text-center text-dark-900">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.technologies.map((tech: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-medium"
                >
                  <Tag className="inline h-4 w-4 mr-2" />
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold font-heading mb-6 text-dark-900">
                Project Overview
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {project.longDescription}
              </p>

              {/* Key Features */}
              <h3 className="text-xl font-semibold mb-4 text-dark-900">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding gradient-bg">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Need a website like this?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              I build modern, high-performance websites for businesses. Let's chat about
              bringing your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rhiannonheaney1@gmail.com"
                className="btn-primary bg-white text-primary-700 hover:bg-gray-100"
              >
                Get In Touch
              </a>
              <Link
                to="/projects"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default ProjectDetail
