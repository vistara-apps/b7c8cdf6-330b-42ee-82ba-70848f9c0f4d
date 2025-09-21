# SerenePulse - Base Mini App

Your on-demand mental reset, powered by stress-aware AI. A Next.js Base Mini App that offers personalized 1-2 minute micro-meditations based on user-detected stress levels.

## Features

- **Stress-Based Micro-Meditations**: Personalized 1-2 minute meditations based on current stress levels
- **Mood-Specific Meditation Library**: Curated meditations categorized by mood (calm, focus, energy, sleep)
- **Session Logging & Insights**: Track meditation sessions and mood improvements over time
- **Progress Tracking**: View meditation history, streaks, and mood trends
- **Base Integration**: Built with MiniKit for seamless Base ecosystem integration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage
- **Identity**: OnchainKit for wallet integration

## Getting Started

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd serenepulse
npm install
```

2. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```
Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open in Base App**:
Navigate to `http://localhost:3000` in Base App or compatible Farcaster client.

## App Structure

### Core Components

- **WelcomeMessage**: Onboarding and app introduction
- **MainMenuButtons**: Primary navigation hub
- **StressAssessment**: Stress level evaluation (1-5 scale)
- **MeditationPlayer**: Audio meditation playback with progress tracking
- **MeditationLibrary**: Browse meditations by category
- **ProgressSummary**: Session history and mood insights

### Data Model

- **User**: Basic user info and credits
- **Session**: Meditation session data with mood tracking
- **Meditation**: Meditation content and metadata

### User Flows

1. **Onboarding**: Welcome → Main Menu
2. **Stress Meditation**: Assess stress → Get recommendation → Meditate → Log mood
3. **Browse Library**: Choose category → Select meditation → Meditate
4. **Progress**: View stats, streaks, and mood trends

## Business Model

- **Free Tier**: Basic stress-based meditations
- **Premium**: Advanced meditations ($0.10-$0.50 per session)
- **Future**: Monthly subscription ($5/mo) for unlimited access

## Design System

### Colors
- Background: `hsl(210, 30%, 10%)`
- Primary: `hsl(195, 75%, 50%)`
- Accent: `hsl(30, 80%, 60%)`
- Surface: `hsl(210, 30%, 15%)`

### Components
- Mobile-first responsive design
- Smooth animations and transitions
- Accessible UI with proper ARIA labels
- Consistent spacing and typography

## Development

### Key Files
- `app/page.tsx`: Main app state management
- `components/`: Reusable UI components
- `lib/types.ts`: TypeScript interfaces
- `lib/utils.ts`: Utility functions
- `lib/constants.ts`: App constants

### Local Storage
Sessions are stored locally for demo purposes. In production, integrate with:
- Base smart contracts for payments
- IPFS for meditation content
- Decentralized identity for user data

## Deployment

1. **Build the app**:
```bash
npm run build
```

2. **Deploy to Vercel/Netlify**:
```bash
npm run start
```

3. **Configure Base Mini App manifest** for discovery in Base App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the Base ecosystem. Find peace in every moment with SerenePulse.
