# 🤖 Expanova Group

**Expanding what's possible.**

![Expanova](./LaunchPad.jpg)

Expanova is an innovation infrastructure company. We build AI-powered tools for startup evaluation, make strategic investments, and deliver rapid development through our agency wing.

This repository contains:
- A beautiful Next.js frontend application
- Modern React components with TypeScript
- Tailwind CSS styling with custom design system
- Allerta Stencil font for impactful titles

## 🚀 What Expanova Does

### **Our Focus:**
- **Criterion**: AI-powered startup evaluation tool that transforms subjective scoring into reliable binary decisions with 85%+ accuracy
- **Expanova Capital**: Strategic investments in validated ideas
- **Expanova Foundry**: Build and scale validated concepts
- **BlackBox Dev**: Rapid web development agency
- **Chartit360**: AI-driven financial analytics platform (portfolio company)

## 🛠️ Quick Start

### **Prerequisites**
- Node.js 18+
- Yarn package manager

### **1. Clone Repository**

```bash
git clone <your-expanova-repo>
cd expanova/LaunchPad
```

### **2. Install Dependencies**

```bash
yarn setup
```

### **3. Start Development Server**

```bash
yarn dev
```

The application will be available at http://localhost:3000

### **4. Build for Production**

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

## 📁 Project Structure

```
LaunchPad/
├── next/                    # Next.js application
│   ├── app/                # App router pages
│   │   ├── [locale]/      # Internationalized routes
│   │   └── globals.css    # Global styles with custom fonts
│   ├── components/        # Reusable React components
│   │   └── expanova/     # Expanova-specific components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── package.json          # Root package configuration
└── README.md            # This file
```

## 🎨 Design System

### Typography
- **Titles**: Allerta Stencil (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono

### Styling
- Tailwind CSS for utility-first styling
- Custom glass morphism effects
- Gradient text effects
- Responsive design with mobile-first approach

## 🌐 Features

- **Modern Stack**: Next.js 14+ with App Router
- **Type Safety**: Full TypeScript coverage
- **Internationalization**: Multi-locale support
- **Performance**: Optimized for Core Web Vitals
- **Responsive**: Mobile, tablet, and desktop layouts
- **Custom Fonts**: Allerta Stencil for distinctive branding

## 📝 Development

### Adding New Pages

Create new pages in `next/app/[locale]/` directory:

```tsx
// next/app/[locale]/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}
```

### Using Custom Fonts

The Allerta Stencil font is automatically applied to all heading elements (h1-h6). To use it on other elements:

```tsx
<div className="title-font">This uses Allerta Stencil</div>
```

### Styling Components

Use Tailwind CSS classes:

```tsx
<div className="glass p-6 rounded-lg">
  <h2 className="text-4xl gradient-text">Title</h2>
</div>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the root directory to `LaunchPad/next`
4. Deploy!

### Other Platforms

Build the application:

```bash
cd next
yarn build
```

Then deploy the `.next` folder to your hosting provider.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Google Fonts for Allerta Stencil and Inter
- Tailwind CSS for the utility-first CSS framework

---

**Built with ❤️ by the Expanova team**

*Expanding what's possible through innovation infrastructure.*
