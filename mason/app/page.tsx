import {client} from '@/lib/sanity.client'
import type {
  Hero,
  Service,
  GalleryItem,
  Testimonial,
  SiteSettings,
} from '@/lib/types'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

export default async function Home() {
  // Fetch all data in parallel with cache tags for on-demand revalidation
  const [hero, services, galleryItems, testimonials, settings] =
    await Promise.all([
      client.fetch<Hero>(
        `*[_type == "hero"][0]`,
        {},
        {next: {tags: ['cms-data']}}
      ),
      client.fetch<Service[]>(
        `*[_type == "service"] | order(order asc)`,
        {},
        {next: {tags: ['cms-data']}}
      ),
      client.fetch<GalleryItem[]>(
        `*[_type == "galleryItem"] | order(order asc)`,
        {},
        {next: {tags: ['cms-data']}}
      ),
      client.fetch<Testimonial[]>(
        `*[_type == "testimonial"] | order(featured desc)`,
        {},
        {next: {tags: ['cms-data']}}
      ),
      client.fetch<SiteSettings>(
        `*[_type == "siteSettings"][0]`,
        {},
        {next: {tags: ['cms-data']}}
      ),
    ])

  // If no data exists at all, show setup message
  if (!settings && !hero && (!services || services.length === 0)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Mason Restoration Website! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your website is ready, but it needs content to display.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Next Steps:</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Open Sanity Studio at <a href="http://localhost:3333" className="text-amber-600 hover:text-amber-700 font-medium" target="_blank">localhost:3333</a></li>
              <li>Start by creating <strong>Site Settings</strong></li>
              <li>Then add a <strong>Hero Section</strong></li>
              <li>Add your <strong>Services</strong>, <strong>Gallery Items</strong>, and <strong>Testimonials</strong></li>
              <li>Refresh this page to see your content!</li>
            </ol>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
              <p className="text-sm text-amber-900">
                <strong>Tip:</strong> Check the SETUP_GUIDE.md file for detailed instructions.
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20">
      {hero && <HeroSection hero={hero} />}

      <div id="services">
        {services && services.length > 0 && (
          <ServicesSection services={services} />
        )}
      </div>

      <div id="gallery">
        {galleryItems && galleryItems.length > 0 && (
          <GallerySection items={galleryItems} />
        )}
      </div>

      <div id="testimonials">
        {testimonials && testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
      </div>

      {settings?.aboutSection && <AboutSection settings={settings} />}

      <div id="contact">
        {settings && <ContactSection settings={settings} />}
      </div>
    </main>
  )
}