export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title'
    },
    {
      name: 'heroText',
      type: 'text',
      title: 'Hero Headline'
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Feature Image',
      options: { hotspot: true } // Allows user to crop in CMS
    }
  ]
}