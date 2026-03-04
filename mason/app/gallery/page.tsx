import {client} from '@/lib/sanity.client'
import type {GalleryItem, SiteSettings} from '@/lib/types'
import GallerySection from '../components/GallerySection'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return {
    title: `Gallery | ${settings?.siteName || 'Mason Restoration'}`,
    description: 'View our portfolio of restored plaques, presentation pieces, and Masonic paraphernalia',
  }
}

export default async function GalleryPage() {
  const galleryItems = await client.fetch<GalleryItem[]>(
    `*[_type == "galleryItem"] | order(order asc)`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return (
    <main className="pt-20">
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Work
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Transforming tarnished treasures back to their former glory
          </p>
        </div>
      </section>

      {galleryItems && galleryItems.length > 0 ? (
        <GallerySection items={galleryItems} />
      ) : (
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <p className="text-xl text-gray-600">
              Gallery items will appear here once added to the CMS.
            </p>
            <p className="text-gray-500 mt-4">
              Add gallery items in Sanity Studio to showcase your work.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
