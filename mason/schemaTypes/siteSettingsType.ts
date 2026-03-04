import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Site Description',
      rows: 3,
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Contact Email',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Contact Phone',
    }),
    defineField({
      name: 'address',
      type: 'text',
      title: 'Business Address',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Media Links',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
      ],
    }),
    defineField({
      name: 'aboutSection',
      type: 'object',
      title: 'About Section',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Section Heading',
        },
        {
          name: 'content',
          type: 'array',
          title: 'About Content',
          of: [{type: 'block'}],
        },
        {
          name: 'image',
          type: 'image',
          title: 'About Image',
          options: {hotspot: true},
        },
      ],
    }),
  ],
})
