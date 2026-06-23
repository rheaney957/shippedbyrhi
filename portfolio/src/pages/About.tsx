import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Award, GraduationCap } from 'lucide-react'

const About: React.FC = () => {
  const experiences = [
    {
      company: 'Rapid7',
      position: 'Senior Software Engineer',
      period: 'June 2025 – Present',
      description: 'Leading front-end development, platform modernisation, and technical initiatives across enterprise cybersecurity products.',
      achievements: [
        'Leading complex, high-impact initiatives requiring strong ownership and technical judgement',
        'Driving engineering quality through TypeScript, testing strategies, and frontend standards',
        'Mentoring engineers through code reviews, technical guidance, and pair programming',
      ],
    },
    {
      company: 'Rapid7',
      position: 'Software Engineer II',
      period: 'February 2024 – June 2025',
      description: 'Delivered customer-facing features and platform modernisation for enterprise cybersecurity products.',
      achievements: [
        'Led front-end modernisation initiatives across multiple applications and shared services',
        'Supported launch of Attack Surface Management (ASM) platform',
        'Improved engineering quality and frontend development standards',
      ],
    },
    {
      company: 'Rapid7',
      position: 'User Experience Engineer II',
      period: 'February 2023 – February 2024',
      description: 'Built and enhanced UI systems for complex, data-heavy cybersecurity products.',
      achievements: [
        'Enhanced front-end tooling and developer experience',
        'Expanded automated testing coverage and practices',
        'Introduced modern development patterns across applications',
      ],
    },
    {
      company: 'Rapid7',
      position: 'User Experience Engineer I',
      period: 'June 2021 – February 2023',
      description: 'Developed responsive, performant interfaces and contributed to component libraries.',
      achievements: [
        'Delivered customer-facing features focused on usability and reliability',
        'Collaborated with Product, Design, UX, and Backend Engineering teams',
        'Standardised key front-end workflows and reduced complexity',
      ],
    },
    {
      company: 'Rapid7',
      position: 'User Experience Engineer Intern',
      period: 'June 2019 – June 2021',
      description: 'Started career building frontend applications and learning enterprise development practices.',
      achievements: [
        'Contributed to enterprise-scale React applications',
        'Earned promotion through consistent delivery and technical growth',
        'Developed strong foundations in TypeScript, React, and modern frontend practices',
      ],
    },
  ]

  const skills = [
    { category: 'Frontend & UI', items: ['TypeScript', 'React', 'JavaScript', 'SPA Architecture', 'Design Systems', 'Performance Optimisation'] },
    { category: 'Modern React', items: ['Hooks', 'State Management', 'API Integration', 'Reusable UI Systems', 'Component Libraries'] },
    { category: 'Testing & Quality', items: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Automated Testing', 'TDD'] },
    { category: 'Tools & Practices', items: ['Vite', 'Webpack', 'Node.js', 'CI/CD', 'Monorepos', 'Agile', 'Git'] },
  ]

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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-dark-900">
                About Me
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a Senior Software Engineer with 6+ years of experience building and modernising
                large-scale React and TypeScript applications in enterprise SaaS environments. I focus
                on frontend architecture, performance, and scalable UI systems for complex, data-heavy products.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                I've progressed from Engineering Intern to Senior Software Engineer at Rapid7 through
                consistent delivery, technical leadership, and ownership of complex projects. Outside of
                my day job, I take on freelance work building modern websites for local businesses.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                  <span>Belfast, Northern Ireland</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  <span>Available for freelance</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary-600" />
                  <span>BSc Business Information Technology, Queen's University Belfast</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12 text-dark-900"
          >
            Work Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-primary-200"></div>
                )}

                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-dark-900">{exp.position}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 mt-1 md:mt-0">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12 text-dark-900"
          >
            Skills & Technologies
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-dark-900 text-center">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
