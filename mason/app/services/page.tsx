import {client} from '@/lib/sanity.client'
import type {Service, ProcessStep, SiteSettings} from '@/lib/types'
import ServicesSection from '../components/ServicesSection'
import type {Metadata} from 'next'
import {urlFor} from '@/lib/sanity.image'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return {
    title: `Services | ${settings?.siteName || 'Mason Restoration'}`,
    description: 'Professional restoration services for plaques, presentation pieces, and Masonic paraphernalia',
  }
}

export default async function ServicesPage() {
  const [services, processSteps] = await Promise.all([
    client.fetch<Service[]>(
      `*[_type == "service"] | order(order asc)`,
      {},
      {next: {tags: ['cms-data']}}
    ),
    client.fetch<ProcessStep[]>(
      `*[_type == "processStep"] | order(order asc)`,
      {},
      {next: {tags: ['cms-data']}}
    ),
  ])

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Expert restoration bringing new life to cherished items
          </p>
        </div>
      </section>

      {/* Services Grid */}
      {services && services.length > 0 && (
        <ServicesSection services={services} />
      )}

      {/* Process Section */}
      {processSteps && processSteps.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every restoration follows our proven step-by-step approach
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <div
                  key={step._id}
                  className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.order}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    {step.image && (
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(step.image).width(800).height(400).url()}
                          alt={step.image.alt || step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-amber-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Restore Your Items?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Get in touch today for a free consultation
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
