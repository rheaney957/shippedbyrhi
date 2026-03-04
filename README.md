# ShippedByRhi Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional layout with exciting animations
- **Responsive**: Optimized for all devices and screen sizes
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Type Safety**: Full TypeScript support for better development experience
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Project Showcase**: Individual pages for each project with detailed information
- **Contact Form**: Interactive contact form with validation
- **Smooth Animations**: Framer Motion animations for enhanced user experience

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Lucide React** - Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rhiannonheaney/shipped-by-rhi.git
cd shipped-by-rhi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build command to: `npm run build`
3. Set the build output directory to: `dist`
4. Deploy!

### Other Platforms

This project can be deployed to any static hosting platform like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── App.tsx              # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary colors
  },
  // Add more custom colors
}
```

### Content
- Update personal information in the page components
- Replace project data in `ProjectDetail.tsx`
- Modify contact information in `Contact.tsx` and `Footer.tsx`

### Projects
Add your projects by:
1. Adding project data to the `projectsData` array in `Projects.tsx`
2. Adding corresponding project details in `ProjectDetail.tsx`
3. Adding project images to the `public` directory

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAIL_SERVICE_ID=your_email_service_id
VITE_EMAIL_TEMPLATE_ID=your_email_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by Rhi