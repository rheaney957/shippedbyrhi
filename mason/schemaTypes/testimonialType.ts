import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Client Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      type: 'string',
      title: 'Organization/Lodge',
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Testimonial Quote',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating (1-5)',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Client Photo (Optional)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Testimonial',
      initialValue: false,
    }),
  ],
})
