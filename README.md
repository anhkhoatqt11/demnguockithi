# Exam Countdown Timer

A modern countdown timer application built with Next.js for tracing time until important exams, specifically designed for Vietnamese high school graduation exams (Vietnam National Exam).

## 🚀 Features

- **Real-time Countdown**: Live countdown timer showing days, hours, minutes, and seconds
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Next.js 14+ and modern React patterns
- **Theme Support**: Light and dark theme support with theme provider
- **Component Library**: Utilizes shadcn/ui components for consistent design
- **TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exam-countdown-timer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-dialog.tsx   # Theme selection dialog
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── public/               # Static assets
```

## 🎯 Usage

The application displays a countdown timer that automatically calculates the time remaining until a specified exam date. The interface is intuitive and requires no additional configuration for basic usage.

### Customizing the Countdown Date

To modify the target exam date, update the countdown logic in the main page component.

### Theme Customization

The application supports both light and dark themes. Users can toggle between themes using the theme selector component.

## 🔧 Configuration

The project uses several configuration files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration  
- `components.json` - shadcn/ui component configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repository-url>)

### Other Platforms

This application can also be deployed on:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Built with ❤️ using Next.js and modern web technologies.