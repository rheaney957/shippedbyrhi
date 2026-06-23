import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Eye, Filter, Search } from 'lucide-react'

const projectsData = [
  {
    id: 'the-academy-dublin',
    title: 'The Academy Dublin',
    description: 'A modern website for The Academy Dublin, a popular live music and entertainment venue in Dublin city centre.',
    image: '/images/academy.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Freelance',
    featured: true,
    liveUrl: 'https://www.theacademydublin.com/',
    githubUrl: 'https://github.com/rheaney957',
  },
  {
    id: 'limelight-belfast',
    title: 'Limelight Belfast',
    description: 'Website for Limelight Belfast, an iconic live music venue and nightclub in the heart of Belfast.',
    image: '/images/limelight.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Freelance',
    featured: true,
    liveUrl: 'https://www.limelightbelfast.com/',
    githubUrl: 'https://github.com/rheaney957',
  },
  {
    id: 'nicomedy',
    title: 'NI Comedy',
    description: 'A website for Northern Ireland\'s comedy scene, showcasing events, comedians, and upcoming shows across the region.',
    image: '/images/nicomedy.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Freelance',
    featured: true,
    liveUrl: 'https://www.nicomedy.co.uk/',
    githubUrl: 'https://github.com/rheaney957',
  },
  {
    id: 'emerge-belfast',
    title: 'Emerge Belfast',
    description: 'Website for Emerge Belfast, a creative events and entertainment company bringing unique experiences to the city.',
    image: '/images/emerge.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Freelance',
    featured: false,
    liveUrl: 'https://www.emergebelfast.com/',
    githubUrl: 'https://github.com/rheaney957',
  },
  {
    id: 'midaz-pms',
    title: 'Midaz PMS',
    description: 'A professional website for Midaz PMS, a property management software solution helping landlords and property managers streamline operations.',
    image: '/images/midazpms.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'Freelance',
    featured: false,
    liveUrl: 'https://www.midazpms.com/',
    githubUrl: 'https://github.com/rheaney957',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This portfolio site — a modern, responsive website built with React and TypeScript, featuring smooth animations and optimised performance.',
    image: '/images/shippedbyrhi.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    category: 'Personal',
    featured: false,
    liveUrl: 'https://www.shippedbyrhi.com',
    githubUrl: 'https://github.com/rheaney957',
  },
]

const categories = ['All', 'Freelance', 'Personal']

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = projectsData.filter(project => project.featured)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-dark-900">
              My Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              A collection of freelance websites I've built for businesses across Ireland and beyond.
              Each project is crafted with modern technologies, responsive design, and performance in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12 text-dark-900"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-dark-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Site
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12 text-dark-900"
          >
            All Projects
          </motion.h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-dark-900">{project.title}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      View Details
                    </Link>
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default Projects
