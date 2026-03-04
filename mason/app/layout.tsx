import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {client} from '@/lib/sanity.client'
import type {SiteSettings} from '@/lib/types'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({subsets: ['latin']})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return {
    title: settings?.siteName || 'Mason Restoration',
    description:
      settings?.description ||
      'Professional restoration services for plaques, presentation pieces, and Masonic paraphernalia',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    {next: {tags: ['cms-data']}}
  )

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {settings && <Header settings={settings} />}
        {children}
        {settings && <Footer settings={settings} />}
      </body>
    </html>
  )
}