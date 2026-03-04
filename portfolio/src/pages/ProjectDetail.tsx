import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, CheckCircle } from 'lucide-react'

// This would typically come from an API or database
const projectData: Record<string, any> = {
  'ecommerce-platform': {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    subtitle: 'Frontend E-commerce Solution',
    description: 'A comprehensive e-commerce platform built with modern technologies, featuring user authentication, product management, payment processing, and an admin dashboard.',
    longDescription: 'This project showcases a complete e-commerce solution that I built from the ground up. It includes user registration and authentication, product catalog with search and filtering, shopping cart functionality, secure payment processing with Stripe integration, order management, and a comprehensive admin dashboard for managing products, orders, and users.',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'JWT', 'Tailwind CSS'],
    category: 'Frontend',
    duration: '3 months',
    role: 'Frontend Developer',
    liveUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/rhiannonheaney/ecommerce-platform',
    challenges: [
      'Implementing secure payment processing with Stripe',
      'Designing scalable database architecture',
      'Creating responsive design for mobile and desktop',
      'Implementing real-time inventory management',
    ],
    solutions: [
      'Used Stripe webhooks for reliable payment confirmation',
      'Implemented proper database indexing and query optimization',
      'Utilized Tailwind CSS for consistent responsive design',
      'Built real-time updates using WebSocket connections',
    ],
    features: [
      'User authentication and authorization',
      'Product catalog with advanced search',
      'Shopping cart and checkout process',
      'Payment processing with Stripe',
      'Order tracking and history',
      'Admin dashboard for management',
      'Responsive design for all devices',
      'Email notifications',
    ],
    testimonial: {
      text: "Rhi delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and code quality is outstanding.",
      author: "John Smith",
      role: "Product Manager",
      company: "Tech Corp"
    }
  },
  'task-management-app': {
    id: 'task-management-app',
    title: 'Task Management App',
    subtitle: 'Collaborative Project Management Tool',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: 'This task management application was designed to streamline team collaboration and project management. It features a modern, intuitive interface with drag-and-drop functionality, real-time updates across team members, and comprehensive project tracking capabilities.',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    technologies: ['Vue.js', 'Express', 'Socket.io', 'MongoDB', 'JWT', 'Vuex'],
    category: 'Frontend',
    duration: '2 months',
    role: 'Frontend Developer',
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/rhiannonheaney/task-management-app',
    challenges: [
      'Implementing real-time collaboration features',
      'Creating smooth drag-and-drop interactions',
      'Managing complex state across multiple views',
    ],
    solutions: [
      'Used Socket.io for real-time communication',
      'Implemented Vue.Draggable for smooth interactions',
      'Utilized Vuex for centralized state management',
    ],
    features: [
      'Real-time collaboration',
      'Drag-and-drop task management',
      'Team member assignment',
      'Project timeline tracking',
      'File attachments',
      'Comments and notifications',
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
                      View Live Demo
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
                    <span><strong>Duration:</strong> {project.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 text-primary-600" />
                    <span><strong>Role:</strong> {project.role}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={project.images[0]}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
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

            {/* Challenges & Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold font-heading mb-6 text-dark-900">
                Challenges & Solutions
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-600">Challenges</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="text-gray-600 pl-4 border-l-2 border-red-200">
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-600">Solutions</h3>
                  <ul className="space-y-2">
                    {project.solutions.map((solution: string, index: number) => (
                      <li key={index} className="text-gray-600 pl-4 border-l-2 border-green-200">
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images.length > 1 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-heading mb-8 text-center text-dark-900"
            >
              Project Gallery
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl font-bold font-heading mb-8 text-dark-900">
                Client Testimonial
              </h2>
              <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                "{project.testimonial.text}"
              </blockquote>
              <div>
                <p className="font-semibold text-dark-900">{project.testimonial.author}</p>
                <p className="text-gray-600">
                  {project.testimonial.role} at {project.testimonial.company}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              Like This Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how I can help bring your ideas to life with the same level of
              quality and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rhiannonheaney1@gmail.com"
                className="btn-primary bg-white text-primary-700 hover:bg-gray-100"
              >
                Start a Project
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