import React from 'react'
import { motion } from 'framer-motion'
import { Download, MapPin, Calendar, Award } from 'lucide-react'

const About: React.FC = () => {
  const experiences = [
    {
      company: 'Tech Company Inc.',
      position: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, TypeScript, and Node.js',
      achievements: ['Led a team of 5 developers', 'Improved performance by 40%', 'Launched 3 major features'],
    },
    {
      company: 'Digital Agency Co.',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: 'Developed custom solutions for clients across various industries',
      achievements: ['Delivered 15+ client projects', 'Maintained 99.9% uptime', 'Reduced costs by 30%'],
    },
    {
      company: 'Startup Solutions',
      position: 'Junior Developer',
      period: '2019 - 2020',
      description: 'Started career building responsive web applications and learning best practices',
      achievements: ['Completed 20+ projects', 'Learned 5+ technologies', 'Received promotion within 1 year'],
    },
  ]

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'Jest'] },
    { category: 'Soft Skills', items: ['Team Leadership', 'Problem Solving', 'Communication', 'Agile', 'Mentoring'] },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-dark-900">
                About Me
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a passionate Frontend developer with over 5 years of experience creating
                digital solutions that matter. I believe in writing clean, efficient code and
                building products that provide real value to users.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or enjoying the great outdoors. I'm always eager to learn
                and take on new challenges.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                  <span>Remote / Worldwide</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  <span>Available for work</span>
                </div>
              </div>
              <button className="btn-primary">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-square bg-gradient-to-br from-primary-400 to-purple-600 rounded-2xl p-1">
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    {/* Replace with your actual photo */}
                    <span className="text-lg">Your Photo Here</span>
                  </div>
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