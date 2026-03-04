import {client} from '@/lib/sanity.client'
import type {SiteSettings, FAQ, Testimonial} from '@/lib/types'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return {
    title: `About | ${settings?.siteName || 'Mason Restoration'}`,
    description: settings?.description || 'Learn about our passion for restoring Masonic treasures',
  }
}

export default async function AboutPage() {
  const [settings, faqs, testimonials] = await Promise.all([
    client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]`,
      {},
      {next: {tags: ['cms-data']}}
    ),
    client.fetch<FAQ[]>(
      `*[_type == "faq"] | order(order asc)`,
      {},
      {next: {tags: ['cms-data']}}
    ),
    client.fetch<Testimonial[]>(
      `*[_type == "testimonial"][0..2]`,
      {},
      {next: {tags: ['cms-data']}}
    ),
  ])

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
            Preserving history through expert craftsmanship
          </p>
        </div>
      </section>

      {/* About Section */}
      {settings?.aboutSection && <AboutSection settings={settings} />}

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our work. Every piece receives meticulous attention to detail.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tradition</h3>
              <p className="text-gray-600">
                We honor traditional restoration techniques while using modern tools for superior results.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Care</h3>
              <p className="text-gray-600">
                We treat every item as if it were our own, understanding its sentimental and historical value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq) => (
                <details
                  key={faq._id}
                  className="group bg-gray-50 rounded-lg p-6 cursor-pointer"
                >
                  <summary className="font-semibold text-lg text-gray-900 list-none flex items-center justify-between">
                    {faq.question}
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </main>
  )
}
