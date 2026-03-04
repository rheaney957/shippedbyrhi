'use client'

import {urlFor} from '@/lib/sanity.image'
import Image from 'next/image'
import type {SiteSettings} from '@/lib/types'

interface AboutSectionProps {
  settings: SiteSettings
}

export default function AboutSection({settings}: AboutSectionProps) {
  if (!settings.aboutSection) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {settings.aboutSection.image && (
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(settings.aboutSection.image)
                    .width(800)
                    .height(600)
                    .url()}
                  alt="About us"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div>
            {settings.aboutSection.heading && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {settings.aboutSection.heading}
              </h2>
            )}
            {settings.aboutSection.content && (
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>Add your about content in the Site Settings → About Section in Sanity Studio.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
