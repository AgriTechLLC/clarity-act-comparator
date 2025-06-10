# Clarity Act Comparator

A futuristic legislative analysis application for comparing different versions of the Digital Asset Market Clarity Act with AI-powered insights.

## Features

- **Legislative Text Comparison**: Side-by-side comparison of Original Bill, HFSC ANS, and HAG ANS versions
- **AI-Powered Summaries**: Generate concise summaries of complex legislative sections using Google's Gemini AI
- **Responsive Design**: Mobile-friendly navigation with a futuristic dark theme
- **Interactive Navigation**: Hierarchical section navigation with collapsible subsections
- **Compliance Tracking**: Detailed compliance obligations breakdown by regulatory authority
- **Error Handling**: Robust error boundaries and loading states

## Prerequisites

- Node.js 18+ (for development)
- A Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Add your Google AI API key to the `.env` file:
   ```
   VITE_GOOGLE_AI_API_KEY=your_actual_api_key_here
   ```

## Development

Run the development server:
```bash
npm run dev
```

The app will open automatically at http://localhost:5173

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Google Generative AI** for AI-powered summaries
- **ESM modules** for modern JavaScript

## Project Structure

```
clarity-act-comparator/
├── components/          # React components
│   ├── AISummary.tsx   # AI summary generation
│   ├── ComparisonView.tsx # Bill comparison display
│   ├── ErrorBoundary.tsx  # Error handling
│   ├── TopNavbar.tsx   # Navigation with mobile support
│   └── ...
├── data/               # Legislative data
│   └── reportData.ts   # Structured report content
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Key Improvements Made

1. **Environment Variables**: Proper Vite environment variable handling
2. **TypeScript**: Strict mode enabled with comprehensive type checking
3. **Mobile Navigation**: Responsive hamburger menu for mobile devices
4. **Error Boundaries**: Graceful error handling with user-friendly messages
5. **Loading States**: Visual feedback during async operations
6. **AI Integration**: Fixed Google Generative AI SDK integration
7. **Accessibility**: Improved ARIA labels and keyboard navigation

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

This project is for educational and analysis purposes.
# clarity-act-comparator
