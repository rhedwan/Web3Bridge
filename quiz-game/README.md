# 🧠 Quiz Game Challenge

A dynamic, interactive quiz game built with React, TypeScript, and Vite for the Web3Bridge Cohort XIII Pre-Qualification Exercise.

![Quiz Game Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Quiz+Game+Challenge)

## 🌟 Features

### Core Features

- **Dynamic Question Loading**: Questions loaded from a structured JSON data source
- **Multiple Choice Interface**: Clean, intuitive answer selection
- **Real-time Feedback**: Instant feedback on answer correctness
- **Score Tracking**: Comprehensive scoring system with percentage calculation
- **Timer System**: Configurable time limits per question with visual indicators
- **Leaderboard**: Persistent high score tracking with localStorage
- **Responsive Design**: Mobile-first, fully responsive interface

### Advanced Features

- **Category Filtering**: Filter questions by topic (Web Development, Programming, Blockchain, Technology)
- **Difficulty Levels**: Easy, Medium, and Hard question difficulty settings
- **Progress Tracking**: Visual progress bar and question counter
- **Game State Management**: Robust state management with custom React hooks
- **Error Handling**: Graceful error handling for edge cases
- **Share Results**: Share quiz results via Web Share API or clipboard
- **Comprehensive Testing**: Unit tests for components and hooks

### Technical Features

- **TypeScript**: Full type safety and better developer experience
- **Modern React**: Hooks-based architecture with custom hooks
- **Vite**: Fast development and build tooling
- **CSS Custom Properties**: Consistent theming and design system
- **Local Storage**: Persistent leaderboard and game data
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quiz-game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once
- `npm run lint` - Lint code

## 🎮 How to Play

### Getting Started

1. **Enter Your Name**: Provide a player name (required to start)
2. **Configure Settings**:
   - Choose time per question (15-60 seconds)
   - Select category filter (optional)
   - Pick difficulty level (optional)
3. **Start Quiz**: Click "Start Quiz" to begin

### During the Game

- **Read Questions**: Each question displays with category and difficulty tags
- **Select Answers**: Click on your chosen answer (A, B, C, or D)
- **Watch Timer**: Keep an eye on the countdown timer
- **View Feedback**: See immediate feedback after each answer
- **Track Progress**: Monitor your progress with the visual progress bar

### Game Rules

- Answer questions within the time limit
- Each correct answer earns 1 point
- Questions are randomly selected based on your filters
- Time expires automatically move to the next question
- Final score is calculated as a percentage

### After the Game

- **View Results**: See detailed performance statistics
- **Review Answers**: Check which questions you got right/wrong
- **Save Score**: Your score is automatically saved to the leaderboard
- **Share Results**: Share your achievement with others
- **Play Again**: Start a new game with the same or different settings

## 🏗️ Project Structure

```
quiz-game/
├── src/
│   ├── components/          # React components
│   │   ├── GameStart.tsx    # Game configuration and start screen
│   │   ├── QuestionCard.tsx # Question display and interaction
│   │   ├── GameResult.tsx   # Results and statistics display
│   │   ├── Leaderboard.tsx  # High scores and rankings
│   │   └── __tests__/       # Component tests
│   ├── hooks/               # Custom React hooks
│   │   ├── useQuizGame.ts   # Game state management
│   │   ├── useLeaderboard.ts# Leaderboard management
│   │   └── __tests__/       # Hook tests
│   ├── types/               # TypeScript type definitions
│   │   └── quiz.ts          # Quiz-related interfaces
│   ├── data/                # Static data and utilities
│   │   └── questions.ts     # Quiz questions and helpers
│   ├── test/                # Test configuration
│   │   └── setup.ts         # Test environment setup
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and design system
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🧪 Testing

The project includes comprehensive tests for components and hooks:

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test:run
```

### Test Coverage

- **Component Tests**: UI behavior, user interactions, and rendering
- **Hook Tests**: State management, game logic, and side effects
- **Integration Tests**: End-to-end user flows
- **Error Handling**: Edge cases and error scenarios

### Test Technologies

- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **jsdom**: Browser environment simulation

## 🎨 Design System

The application uses a consistent design system with:

### Color Palette

- **Primary**: Blue (#3b82f6) - Main actions and highlights
- **Secondary**: Green (#10b981) - Success states and correct answers
- **Danger**: Red (#ef4444) - Errors and incorrect answers
- **Warning**: Orange (#f59e0b) - Warnings and time alerts
- **Gray Scale**: Various shades for text and backgrounds

### Typography

- **Font Family**: Inter, system fonts
- **Scale**: Consistent sizing from 0.75rem to 2.25rem
- **Weights**: Light (300) to Bold (700)

### Spacing

- **System**: 0.25rem base unit with consistent multipliers
- **Layout**: Responsive spacing that adapts to screen size

### Components

- **Cards**: Elevated surfaces with shadows and rounded corners
- **Buttons**: Multiple variants with hover states and accessibility
- **Forms**: Consistent input styling with focus states
- **Progress**: Visual indicators for game progress and timers

## 📱 Responsive Design

The application is fully responsive with:

### Breakpoints

- **Mobile**: < 480px - Single column layout
- **Tablet**: 480px - 768px - Adapted layouts
- **Desktop**: > 768px - Full multi-column layouts

### Mobile Features

- Touch-friendly button sizes (minimum 44px)
- Optimized typography scaling
- Simplified navigation
- Gesture-friendly interactions

## 🚀 Deployment

### GitHub Pages Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**

   ```bash
   # Install gh-pages if not already installed
   npm install -g gh-pages

   # Deploy dist folder to gh-pages branch
   gh-pages -d dist
   ```

3. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save settings

### Vercel Deployment

1. **Connect Repository**

   - Import project from GitHub to Vercel
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Preview deployments for pull requests

### Other Platforms

The built application (`dist` folder) can be deployed to:

- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- Any static hosting service

## 🔧 Configuration

### Environment Variables

The application doesn't require environment variables for basic functionality, but you can configure:

```bash
# Optional: Enable development debugging
NODE_ENV=development

# Optional: Configure base URL for deployment
VITE_BASE_URL=/quiz-game/
```

### Customization

#### Adding Questions

Edit `src/data/questions.ts` to add new questions:

```typescript
{
  id: 21,
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0, // Index of correct option
  category: "Your Category",
  difficulty: "easy", // "easy" | "medium" | "hard"
  timeLimit: 30 // Optional: seconds
}
```

#### Styling

Modify CSS custom properties in `src/index.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... other variables */
}
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes and test**
   ```bash
   npm run test
   npm run lint
   ```
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new feature"
   ```
5. **Push and create pull request**

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting (configure in your editor)
- **Testing**: Maintain test coverage for new features

## 📄 License

This project is created for educational purposes as part of the Web3Bridge Cohort XIII Pre-Qualification Exercise.

## 🙏 Acknowledgments

- **Web3Bridge**: For providing the opportunity and requirements
- **React Team**: For the amazing React framework
- **Vite Team**: For the fast build tooling
- **TypeScript Team**: For type safety and developer experience

## 📞 Support

For questions or issues:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ for Web3Bridge Cohort XIII**
