// Types for Sanity content
export interface Hero {
  _id: string
  heading: string
  subheading?: string
  backgroundImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  ctaText?: string
  ctaLink?: string
}

export interface Service {
  _id: string
  title: string
  description: string
  icon?: string
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  order: number
}

export interface GalleryItem {
  _id: string
  title: string
  description?: string
  beforeImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  afterImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  category?: string
  featured?: boolean
  order: number
}

export interface Testimonial {
  _id: string
  name: string
  organization?: string
  quote: string
  rating: number
  image?: {
    asset: {
      _ref: string
    }
  }
  featured?: boolean
}

export interface SiteSettings {
  _id: string
  siteName: string
  tagline?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  logo?: {
    asset: {
      _ref: string
    }
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  aboutSection?: {
    heading?: string
    content?: any[]
    image?: {
      asset: {
        _ref: string
      }
    }
  }
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  category?: string
  order: number
}

export interface ProcessStep {
  _id: string
  title: string
  description: string
  icon?: string
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  order: number
}
