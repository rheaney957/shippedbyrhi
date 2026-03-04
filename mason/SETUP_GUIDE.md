# Website Setup Guide for Client

## Quick Start Guide

Your website is now ready to use! This guide will help you set up and manage your content.

## What You Need to Know

This website consists of two parts:
1. **Sanity Studio** (CMS) - Where you edit content
2. **Next.js Website** - The public-facing website

## Step 1: First Time Setup

### Install Dependencies (One Time Only)

Open your terminal in this project folder and run:

```bash
npm install
```

### Configure Your Secret Key (One Time Only)

1. Generate a random secret key at: https://randomkeygen.com/
2. Note: The .env.local file should already exist with your Sanity project ID
3. You only need to update the SANITY_REVALIDATE_SECRET if setting up webhooks

## Step 2: Running the Website Locally

You need to run TWO commands in separate terminal windows:

### Terminal 1 - Sanity Studio (Content Management)

```bash
npm run sanity
```

- Opens at: http://localhost:3333
- This is where you'll edit all website content

### Terminal 2 - Website Preview

```bash
npm run dev
```

- Opens at: http://localhost:3000
- This is your website preview

## Step 3: Adding Your First Content

### Order of Content Creation

1. **Site Settings** (Do this first!)
   - Go to Sanity Studio (http://localhost:3333)
   - Click "Site Settings"
   - Fill in:
     - Site Name
     - Tagline
     - Description
     - Contact Email
     - Phone Number
     - Address
     - Upload your logo
     - Add social media links
   - Click "Publish"

2. **Hero Section** (Homepage Banner)
   - Click "Hero Section"
   - Add:
     - Main Heading (e.g., "Restoring Mason History")
     - Subheading
     - Upload Background Image
     - Call-to-Action Button Text (e.g., "Get A Quote")
     - Call-to-Action Link (e.g., "#contact")
   - Click "Publish"

3. **Services**
   - Click "Service" → "Create new"
   - Add:
     - Service Title
     - Description
     - Upload Service Image
     - Display Order (use numbers: 1, 2, 3...)
   - Click "Publish"
   - Repeat for each service

4. **Gallery Items** (Before/After Photos)
   - Click "Gallery Item" → "Create new"
   - Add:
     - Title
     - Description
     - Before Image (optional)
     - After Image (required)
     - Category (Plaques, Presentation Pieces, etc.)
     - Display Order
   - Click "Publish"
   - Repeat for each project

5. **Testimonials**
   - Click "Testimonial" → "Create new"
   - Add:
     - Client Name
     - Organization/Lodge
     - Quote
     - Rating (1-5)
   - Click "Publish"
   - Repeat for each testimonial

6. **About Section**
   - Go back to "Site Settings"
   - Scroll to "About Section"
   - Add:
     - Section Heading
     - About Content (use the rich text editor)
     - Upload About Image
   - Click "Publish"

## Step 4: Viewing Your Changes

After publishing content in Sanity Studio:
1. Go to your website preview (http://localhost:3000)
2. Refresh the page
3. Your changes should appear!

## Step 5: Setting Up Automatic Updates (Webhooks)

Once your website is deployed, set up webhooks so changes in Sanity automatically update your live website:

1. Go to: https://www.sanity.io/manage
2. Select your project
3. Click "API" → "Webhooks"
4. Click "Create webhook"
5. Fill in:
   - **Name**: Next.js Revalidation
   - **URL**: `https://your-website.com/api/revalidate`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **Secret**: (copy from your .env.local file)
6. Save

Now whenever you publish changes in Sanity, your website will automatically update!

## Common Tasks

### Updating Content
1. Open Sanity Studio (npm run sanity)
2. Find the content you want to edit
3. Make your changes
4. Click "Publish"

### Adding New Services
1. Sanity Studio → Service → Create new
2. Fill in all fields
3. Set Display Order (higher numbers appear later)
4. Publish

### Adding New Gallery Items
1. Sanity Studio → Gallery Item → Create new
2. Upload images
3. Categorize appropriately
4. Publish

### Changing Contact Information
1. Sanity Studio → Site Settings
2. Update contact fields
3. Publish

## Tips for Best Results

### Images
- **Hero Background**: 1920x1080px or larger
- **Service Images**: 800x600px
- **Gallery Images**: 1200x900px
- **Logo**: 200x200px (square, transparent background)
- Use JPG for photos, PNG for logos

### Writing Tips
- Keep headings short and impactful
- Service descriptions: 2-3 sentences
- Testimonials: 1-2 sentences for impact

### Display Order
- Lower numbers show first (1, 2, 3...)
- Use increments of 10 (10, 20, 30) to easily insert items later

## Deployment

When ready to go live:

### Option 1: Vercel (Recommended - Free)
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables
5. Deploy!

### Option 2: Other Hosts
- Follow their Next.js deployment guides
- Remember to add environment variables

## Troubleshooting

### Changes not showing?
1. Make sure you clicked "Publish" (not just "Save")
2. Refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Check that both terminal windows are running

### Images not loading?
1. Check that you uploaded them in Sanity
2. Verify your Sanity project ID in .env.local
3. Wait a moment for Sanity CDN to process

### Need Help?
- Check the main README.md file
- Visit Sanity documentation: https://www.sanity.io/docs
- Contact your developer

## Content Checklist

Before launching, make sure you have:
- [ ] Site Settings configured
- [ ] Hero section with image
- [ ] At least 3 services
- [ ] At least 6 gallery items
- [ ] At least 3 testimonials
- [ ] About section filled out
- [ ] Contact information accurate
- [ ] Logo uploaded
- [ ] All images optimized

## Next Steps

1. Complete all content sections
2. Review the website locally
3. Deploy to production
4. Set up webhooks
5. Test the live website
6. Share with the world!

---

**Remember**: You can always test changes locally before deploying to production!
