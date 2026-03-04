# Mason Restoration Website

A professional website for Mason plaque resurfacing services, built with Next.js and Sanity CMS.

## Features

- **Full CMS Integration**: All content is managed through Sanity CMS
- **Webhook Integration**: Automatic content updates via Sanity webhooks
- **Responsive Design**: Mobile-first, professional design
- **Image Optimization**: Next.js Image component with Sanity CDN
- **Sections**:
  - Hero section with background image
  - Services showcase
  - Before/After gallery with filtering
  - Client testimonials
  - About section
  - Contact information

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=jarqkhyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=your-random-secret-key
```

Replace `your-random-secret-key` with a secure random string.

### 3. Run Sanity Studio

Start the Sanity Studio to manage content:

```bash
npm run sanity
```

Visit http://localhost:3333 to access the CMS.

### 4. Run Next.js Development Server

In a separate terminal, start the Next.js development server:

```bash
npm run dev
```

Visit http://localhost:3000 to view the website.

## Sanity Webhook Setup

To enable automatic content updates when your client changes content in Sanity:

1. Go to your Sanity project dashboard: https://www.sanity.io/manage
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure:
   - **Name**: Next.js Revalidation
   - **URL**: `https://your-domain.com/api/revalidate` (use your deployment URL)
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **Secret**: Use the same value as `SANITY_REVALIDATE_SECRET` from your .env.local
5. Click **Save**

## Content Management

### Initial Content Setup

1. **Site Settings** (Singleton):
   - Site name, tagline, description
   - Contact information (email, phone, address)
   - Logo
   - Social media links
   - About section content

2. **Hero Section** (Singleton):
   - Main heading
   - Subheading
   - Background image
   - Call-to-action button

3. **Services**:
   - Create multiple service entries
   - Each has: title, description, image, display order

4. **Gallery Items**:
   - Upload before/after images
   - Categorize (plaques, presentation, masonic, other)
   - Mark featured items

5. **Testimonials**:
   - Client name, organization
   - Quote and rating
   - Optional client photo

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
5. Update the webhook URL in Sanity to your production URL

## Project Structure

```
mason/
├── app/
│   ├── components/         # React components
│   ├── api/revalidate/    # Webhook endpoint
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── lib/
│   ├── sanity.client.ts   # Sanity client configuration
│   ├── sanity.image.ts    # Image URL builder
│   └── types.ts           # TypeScript types
├── schemaTypes/           # Sanity schema definitions
└── sanity.config.ts       # Sanity configuration
```

## Customization

### Colors

The site uses an amber/gold color scheme suitable for Mason-related businesses. To change colors, edit the tailwind.config.ts file.

### Fonts

The site uses Inter font. To change, edit the font import in app/layout.tsx.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Community](https://www.sanity.io/community/join)
