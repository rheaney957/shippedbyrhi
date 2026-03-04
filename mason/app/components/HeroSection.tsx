'use client'

import {urlFor} from '@/lib/sanity.image'
import Image from 'next/image'
import type {Hero} from '@/lib/types'

interface HeroSectionProps {
  hero: Hero
}

export default function HeroSection({hero}: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      {hero.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(hero.backgroundImage).width(1920).height(1080).url()}
            alt={hero.backgroundImage.alt || 'Hero background'}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
      )}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {hero.heading}
        </h1>
        {hero.subheading && (
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {hero.subheading}
          </p>
        )}
        {hero.ctaText && hero.ctaLink && (
          <a
            href={hero.ctaLink}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
          >
            {hero.ctaText}
          </a>
        )}
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
