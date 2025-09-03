# Accessibility Analysis Frontend

A modern React TypeScript frontend for analyzing infotainment systems for WCAG 2.2 compliance.

## Features

- **Modern UI/UX**: Premium, responsive design with Material-UI components
- **Dark/Light Mode**: Stylish theme toggle with smooth transitions
- **File Upload**: Support for 100+ file types with drag-and-drop interface
- **LLM Integration**: Select from 6 major LLM providers for analysis
- **WCAG 2.2 Compliance**: Comprehensive accessibility analysis with POUR classification
- **Interactive Results**: Detailed issue modal with code snippets and live preview
- **User Authentication**: Secure login/register functionality
- **Session Management**: Save and manage analysis sessions
- **Export Functionality**: Export results in multiple formats

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for premium UI components
- **Zustand** for state management
- **React Router DOM** for navigation
- **Framer Motion** for smooth animations
- **Axios** for API communication

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Auth/          # Authentication components
│   │   ├── FileUpload/    # File upload components
│   │   ├── Layout/        # Layout components
│   │   ├── LLMSelection/  # LLM selection components
│   │   └── Results/       # Results display components
│   ├── pages/             # Page components
│   │   ├── AnalysisPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── ResultsPage.tsx
│   ├── data/              # Static data
│   │   ├── llmModels.ts   # LLM model configurations
│   │   └── wcag22.ts      # WCAG 2.2 guidelines
│   ├── store/             # State management
│   │   └── index.ts       # Zustand store
│   ├── theme/             # Theme configuration
│   │   └── index.ts       # Material-UI theme
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Global types
│   ├── App.tsx            # Main app component
│   └── index.tsx          # App entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Key Components

### Authentication
- **LoginForm**: User login with email/password
- **ProtectedRoute**: Route protection for authenticated users

### File Management
- **FileUpload**: Drag-and-drop file upload with type validation
- Support for 100+ file types including code, media, and configuration files

### Analysis
- **LLMSelection**: Multi-select interface for choosing LLM models
- **AnalysisPage**: Main analysis workflow interface
- **ResultsPage**: Display analysis results with POUR categorization

### Results Display
- **IssueModal**: Detailed issue view with code snippets and suggestions
- Interactive filtering by POUR principle and severity
- Export functionality for results

## State Management

The application uses Zustand for state management with the following stores:

- **Authentication**: User login state and token management
- **File Management**: Uploaded files and metadata
- **Analysis**: Analysis sessions and results
- **Theme**: Dark/light mode preferences

## API Integration

The frontend communicates with the backend API at `http://localhost:8000`:

- **Authentication**: `/auth/*` endpoints
- **File Management**: `/files/*` endpoints
- **Analysis**: `/analysis/*` endpoints
- **WCAG Data**: `/wcag/*` endpoints

## Styling

- **Material-UI**: Primary component library
- **Custom Theme**: Dark/light mode with custom color palette
- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions

## Development

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)

### Testing
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test components thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.
