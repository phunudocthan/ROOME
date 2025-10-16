# Contributing to ROOME

Thank you for considering contributing to ROOME! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Project Structure](#project-structure)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Be respectful and considerate
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what is best for the project
- Show empathy towards other contributors

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- MongoDB Atlas account
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ROOME.git
   cd ROOME
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/phunudocthan/ROOME.git
   ```

4. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

5. **Set up environment variables**
   ```bash
   # Client
   cd client
   cp .env.example .env.local

   # Server
   cd ../server
   cp .env.example .env
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Server
   cd server
   npm run dev

   # Terminal 2 - Client
   cd client
   npm run dev
   ```

---

## Development Workflow

### Branching Strategy

We use a feature branch workflow:

1. **Main branch** (`main`) - Production-ready code
2. **Development branch** (`develop`) - Integration branch
3. **Feature branches** (`feature/feature-name`) - New features
4. **Bug fix branches** (`fix/bug-name`) - Bug fixes
5. **Hotfix branches** (`hotfix/issue-name`) - Critical fixes

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

### Working on Your Feature

1. Make your changes
2. Test your changes thoroughly
3. Commit your changes (see commit guidelines)
4. Push to your fork
5. Create a pull request

---

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the DRY (Don't Repeat Yourself) principle
- Keep functions small and focused
- Use meaningful variable and function names
- Comment complex logic
- Write self-documenting code

### TypeScript

- Always use TypeScript for type safety
- Avoid using `any` type
- Define proper interfaces and types
- Use enums for constants
- Enable strict mode in tsconfig.json

### Frontend (React/Next.js)

```typescript
// Good: Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

**Best Practices:**
- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper error boundaries
- Use React.memo() for optimization when needed
- Follow Next.js conventions for routing

### Backend (Express/Node.js)

```typescript
// Good: Controller with proper error handling
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
```

**Best Practices:**
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate input data
- Use middleware for common functionality
- Follow RESTful API conventions
- Document all endpoints

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Create reusable component styles
- Keep styles consistent
- Use CSS variables for theming

### File Naming Conventions

- **Components:** PascalCase (`Button.tsx`, `UserCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`, `apiClient.ts`)
- **Pages (Next.js):** lowercase with hyphens (`user-profile.tsx`)
- **Constants:** UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(client): add user profile page"

# Bug fix
git commit -m "fix(server): resolve authentication token expiry issue"

# Documentation
git commit -m "docs: update API documentation"

# Multiple files
git commit -m "refactor(client): restructure components folder
- Move common components to shared folder
- Update imports across the application
- Add component documentation"
```

---

## Pull Request Process

### Before Creating a PR

1. **Ensure your code works**
   ```bash
   # Run tests
   npm test

   # Check for linting errors
   npm run lint

   # Build the project
   npm run build
   ```

2. **Update your branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/your-feature
   git rebase main
   ```

3. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

### Creating a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the tests you ran

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

### PR Review Process

1. Automated checks must pass (linting, tests, build)
2. At least one team member must review the PR
3. Address all review comments
4. Maintainer will merge once approved

### After Your PR is Merged

1. Delete your feature branch
2. Update your local repository
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

---

## Project Structure

### Understanding the Codebase

```
ROOME/
├── client/              # Frontend (Next.js)
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── app/       # Next.js pages (App Router)
│   │   ├── components/ # React components
│   │   ├── lib/       # Utilities & config
│   │   ├── hooks/     # Custom hooks
│   │   ├── services/  # API calls
│   │   ├── types/     # TypeScript types
│   │   └── styles/    # Global styles
│   └── ...
│
├── server/             # Backend (Express)
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── controllers/ # Route handlers
│   │   ├── models/    # Database models
│   │   ├── routes/    # API routes
│   │   ├── middlewares/ # Express middlewares
│   │   ├── services/  # Business logic
│   │   ├── utils/     # Helper functions
│   │   └── types/     # TypeScript types
│   └── ...
│
└── docs/              # Documentation
```

### Key Files to Know

- `client/src/app/layout.tsx` - Root layout component
- `client/src/lib/axios.ts` - API client configuration
- `server/src/index.ts` - Server entry point
- `server/src/routes/index.ts` - API routes registration
- `server/src/config/database.ts` - Database connection

---

## Testing

### Running Tests

```bash
# Client tests
cd client
npm test

# Server tests
cd server
npm test

# Watch mode
npm run test:watch
```

### Writing Tests

**Frontend:**
```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

**Backend:**
```typescript
// user.test.ts
import request from 'supertest';
import app from '../index';

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(201);
  });
});
```

---

## Need Help?

- Check existing issues and PRs
- Read the documentation in `/docs`
- Ask questions in discussions
- Contact the team members

---

## Team Members

1. Member 1 - Role
2. Member 2 - Role
3. Member 3 - Role
4. Member 4 - Role
5. Member 5 - Role

---

Thank you for contributing to ROOME! 🚀
