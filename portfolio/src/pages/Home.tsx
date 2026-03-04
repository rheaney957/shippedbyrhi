import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Code2, Palette, Zap, Users } from 'lucide-react'

const Home: React.FC = () => {
  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Building robust applications with modern technologies',
      color: 'text-blue-500',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user experiences',
      color: 'text-purple-500',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and efficiency',
      color: 'text-yellow-500',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Working effectively in agile development teams',
      color: 'text-green-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Welcome to my portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
                Hi, I'm{' '}
                <span className="gradient-text bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
                  Rhi
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                A passionate{' '}
                <span className="font-semibold text-primary-700">Frontend Developer</span>{' '}
                who loves creating exceptional digital experiences that make a difference.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/projects"
                className="btn-primary group"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary group">
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Download CV
              </button>
            </motion.div>

            {/* Floating Animation Element */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 mx-auto mb-16 bg-gradient-to-br from-primary-400 to-purple-600 rounded-full opacity-20"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-dark-900">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I combine technical expertise with creative problem-solving to deliver
              outstanding results across the full development stack.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 ${skill.color} bg-current bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${skill.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-dark-900">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600">
                    {skill.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's collaborate and create something extraordinary together.
              I'm always excited to work on new challenging projects.
            </p>
            <a
              href="mailto:rhiannonheaney1@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home