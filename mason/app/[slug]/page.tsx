import {client} from '@/lib/sanity.client'
import {notFound} from 'next/navigation'

interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  content?: any[]
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all pages
export async function generateStaticParams() {
  const pages = await client.fetch<{slug: {current: string}}[]>(
    `*[_type == "page" && defined(slug.current)]{
      "slug": slug
    }`
  )

  return pages.map((page) => ({
    slug: page.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({params}: PageProps) {
  const {slug} = await params
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == $slug][0]`,
    {slug},
    {next: {tags: ['cms-data']}}
  )

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: page.description || '',
  }
}

export default async function Page({params}: PageProps) {
  const {slug} = await params
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      content
    }`,
    {slug},
    {next: {tags: ['cms-data']}}
  )

  if (!page) {
    notFound()
  }

  return (
    <main className="pt-20">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-xl text-gray-600">{page.description}</p>
          )}
        </header>

        {page.content && (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Content will appear here. Add rich text content in Sanity Studio.
            </p>
          </div>
        )}
      </article>
    </main>
  )
}
