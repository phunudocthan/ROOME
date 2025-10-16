# ROOME Client

This is the frontend application for the ROOME project, built with Next.js 14, React, and TypeScript.

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # Reusable React components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── lib/            # Utility functions and configurations
│   │   ├── axios.ts    # Axios configuration
│   │   └── utils.ts    # Utility functions
│   ├── hooks/          # Custom React hooks
│   │   └── useAuth.ts  # Authentication hook
│   ├── services/       # API service calls
│   │   └── api.service.ts
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   └── styles/         # Global styles
│       └── globals.css
├── .env.example        # Environment variables template
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update the `.env.local` file with your configuration.

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:
```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## 📦 Key Dependencies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom utility classes are defined in `src/styles/globals.css`.

## 🔗 API Integration

API calls are configured in `src/lib/axios.ts` and organized in `src/services/` directory.

## 📝 Code Style

- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking

## 🤝 Contributing

Please read the main project README for contribution guidelines.
