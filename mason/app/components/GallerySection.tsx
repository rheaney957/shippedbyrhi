'use client'

import {urlFor} from '@/lib/sanity.image'
import Image from 'next/image'
import {useState} from 'react'
import type {GalleryItem} from '@/lib/types'

interface GallerySectionProps {
  items: GalleryItem[]
}

export default function GallerySection({items}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    {value: 'all', label: 'All Work'},
    {value: 'plaques', label: 'Plaques'},
    {value: 'presentation', label: 'Presentation Pieces'},
    {value: 'masonic', label: 'Masonic Items'},
    {value: 'other', label: 'Other'},
  ]

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Before and after transformations that speak for themselves
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                {item.beforeImage && (
                  <div className="relative h-64 group">
                    <div className="absolute inset-0 z-10">
                      <Image
                        src={urlFor(item.beforeImage).width(600).height(400).url()}
                        alt={item.beforeImage.alt || `${item.title} - Before`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src={urlFor(item.afterImage).width(600).height(400).url()}
                        alt={item.afterImage.alt || `${item.title} - After`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-4 z-30 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                      Hover for After
                    </div>
                  </div>
                )}
                {!item.beforeImage && item.afterImage && (
                  <div className="relative h-64">
                    <Image
                      src={urlFor(item.afterImage).width(600).height(400).url()}
                      alt={item.afterImage.alt || item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-600">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
