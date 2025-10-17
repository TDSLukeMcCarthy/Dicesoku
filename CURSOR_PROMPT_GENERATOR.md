# Game Prototype Cursor Prompt Generator

## Instructions for ChatGPT

Based on our previous conversation about the game concept, generate a comprehensive, detailed prompt for Cursor AI (Claude) that will enable a one-shot implementation of the game. The prompt should be highly specific and structured to ensure successful implementation.

---

## Game Concept Summary
[You will fill this in based on our previous conversation about the game idea]

---

## Generate a Cursor Prompt with the Following Structure:

### 1. PROJECT OVERVIEW
Create a brief but clear description of:
- Game name and core concept
- Win/loss conditions
- Primary gameplay mechanics
- Target platform (web browser - desktop and mobile web)

### 2. TECH STACK REQUIREMENTS
Specify that the project should use:
- **Next.js 15+** (App Router architecture)
- **TypeScript** with strict typing
- **Tailwind CSS 4** for styling and responsive design
- **Shadcn UI components** for UI elements (buttons, dialogs, cards, etc.)
- **Lucide Icons** for all iconography
- **Framer Motion** for animations and transitions
- **Vercel** deployment optimization

**Note on Mobile Apps:** Initial focus is on creating an excellent web experience that works perfectly on mobile browsers. Keep code client-side compatible (avoid Node.js-specific APIs in components) to allow for future Capacitor.js integration if the prototype is successful.

### 3. PROJECT STRUCTURE
Specify the exact folder structure:
```
/src
  /app
    - page.tsx (main orchestrator)
    - layout.tsx
    - globals.css
  /components
    - Lobby.tsx (main menu/settings screen)
    - Game.tsx (main game controller)
    - [Additional game-specific components]
  /types
    - game.ts (all TypeScript interfaces and types)
  /utils
    - gameLogic.ts (core game mechanics)
    - [levelGenerator.ts - IF NEEDED for procedural generation]
    - [helpers.ts - for utility functions]
```

### 4. COMPONENT ARCHITECTURE

#### A. Main Page (`src/app/page.tsx`)
Describe the requirements:
- State management for screen navigation ('lobby' | 'game' | [other screens])
- Game settings/preferences state
- LocalStorage integration for:
  - Current level/progress
  - High scores
  - User preferences
  - [Any other persistent data]
- Screen transition logic
- Back button functionality when in game

#### B. Lobby Component (`src/components/Lobby.tsx`)
Specify the lobby should include:
- Game title and branding
- Current progress display (level, score, etc.)
- Game settings/toggles:
  - [List specific settings for this game, e.g., difficulty, grid size, time limits]
- Play button (large, prominent)
- Game rules/instructions section
- Visual polish with gradients and modern UI
- Difficulty indicators if applicable

#### C. Game Component (`src/components/Game.tsx`)
Detail the main game controller requirements:
- Game state management (using GameState interface)
- Level initialization
- Game loop/turn management
- Win/loss condition checking
- UI elements:
  - Score/stats display
  - [Game-specific controls]
  - Instructions/help section
  - Visual feedback for game status
- Completion callback to return to lobby

#### D. Additional Components
For each major game element, specify:
- Component name and purpose
- Props interface
- Visual representation requirements
- Interaction handling (click, drag, hover, etc.)
- Animation requirements
- Responsive sizing based on settings

### 5. TYPE DEFINITIONS (`src/types/game.ts`)

Specify all TypeScript interfaces needed:

```typescript
// Example structure - customize for your game
export type [SpecificGameValue] = [possible values];

export interface Level {
  // Level configuration
}

export interface GameState {
  level: Level;
  currentLevel: number;
  // Game-specific state properties
  gameStatus: 'playing' | 'won' | 'lost';
  // Score, moves, timers, etc.
}

// Additional interfaces as needed
```

### 6. GAME LOGIC (`src/utils/gameLogic.ts`)

List all required functions with clear descriptions:

```typescript
// Core game functions needed:
export function createGameState(level: Level, levelNumber: number, ...): GameState { }
export function [performGameAction](...): GameState { }
export function validateGame(gameState: GameState): ValidationResult { }
export function checkWinCondition(gameState: GameState): boolean { }
export function checkLossCondition(gameState: GameState): boolean { }
// ... other game-specific logic functions
```

### 7. LEVEL GENERATION (if applicable)
If the game needs procedural level generation, specify:
- Algorithm approach (solution-first, constraint-based, random with validation, etc.)
- Level difficulty progression
- Validation requirements to ensure solvability
- Parameters that scale with difficulty
- Fallback mechanisms for failed generation

Example structure:
```typescript
export function generateLevel(difficulty: number, ...): Level {
  // Generation logic
  // Validation
  // Fallback to simpler level if needed
}
```

### 8. STYLING REQUIREMENTS

Specify the visual design:
- Color scheme (primary, secondary, accent colors)
- Modern, clean UI aesthetic
- Smooth animations and transitions using Framer Motion
- Responsive design considerations:
  - Mobile-first approach
  - Tablet optimization
  - Desktop enhancements
- Component styling patterns:
  - Buttons: rounded, shadowed, hover effects
  - Cards: elevated, rounded corners
  - Grid/Board: appropriate sizing, clear cell states
  - Game pieces: clear visual representation
- Accessibility considerations

### 9. GAME-SPECIFIC FEATURES

Detail unique mechanics:
- **Input Methods:** [touch, click, drag-and-drop, keyboard, etc.]
- **Visual Feedback:** [highlights, color changes, animations]
- **Sound Triggers:** [where sound effects should be added later]
- **Special Abilities:** [if any]
- **Power-ups/Items:** [if applicable]
- **Timer/Scoring Logic:** [if applicable]
- **Undo/Redo:** [if needed]
- **Hints/Auto-solve:** [if applicable]

### 10. PROGRESSION SYSTEM

Describe how the game tracks progress:
- Level advancement logic
- Score calculation
- Achievement/milestone system (if any)
- Difficulty scaling
- What data persists between sessions

### 11. UI/UX POLISH REQUIREMENTS

Specify polish elements:
- Loading states with "Generating level..." or similar
- Success animations when winning
- Failure feedback when losing
- Celebration effects (confetti, particles, etc.)
- Smooth transitions between screens
- Helpful tooltips or onboarding
- Clear visual hierarchy
- Intuitive controls

### 12. TESTING & EDGE CASES

List important test scenarios:
- Win condition triggers correctly
- Loss condition triggers correctly
- State persists correctly in localStorage
- Invalid moves are prevented
- Edge cases in game logic
- Responsive design at different screen sizes
- Performance with complex game states

### 13. NICE-TO-HAVE FEATURES

List optional enhancements (clearly marked as optional):
- Statistics tracking
- Daily challenges
- Share functionality
- Theme customization
- Sound effects (mention where to add hooks)
- Leaderboard integration points
- Tutorial mode

### 14. DELIVERABLES

Specify that the Cursor prompt should result in:
- ✅ Fully functional game playable in browser
- ✅ Clean, typed, well-commented code
- ✅ Responsive design working on mobile and desktop browsers
- ✅ Touch-friendly interactions for mobile web
- ✅ LocalStorage persistence working
- ✅ Smooth animations and transitions
- ✅ Clear separation of concerns (components, logic, types)
- ✅ Ready to deploy to Vercel
- ✅ Code structure compatible with future Capacitor.js integration

### 15. PHASE 2: MOBILE APP (Future Enhancement)

Clearly state this is NOT part of the initial implementation:
- **After** the web prototype is tested and validated
- Capacitor.js can be added to build native APKs for Android/iOS
- This is why we keep client-side code Node.js-free
- Initial focus: excellent mobile browser experience
- Native app is optional enhancement if prototype succeeds

---

## Output Format

Generate a single, comprehensive Cursor/Claude prompt that includes:
1. A clear project description
2. Complete technical requirements
3. Detailed component specifications
4. All type definitions needed
5. Game logic function signatures and descriptions
6. Styling and UX requirements
7. Implementation notes and best practices

The prompt should be detailed enough that Claude can implement the entire game in one shot without needing clarifying questions.

---

## Example Prompt Structure

Start the Cursor prompt like this:

```
Create a fully functional [GAME NAME] game using Next.js, TypeScript, and Tailwind CSS.

## Game Concept
[Clear description of the game, how to play, win/loss conditions]

## Technical Requirements
- Next.js 15+ with App Router
- TypeScript with strict typing
- Tailwind CSS 4 for styling
- Shadcn UI components
- Lucide Icons
- Framer Motion for animations
- LocalStorage for persistence
- Vercel deployment ready
- Mobile-first responsive design (works perfectly in mobile browsers)

## Project Structure
[Detailed folder and file structure]

## Implementation Details

### 1. Types (src/types/game.ts)
[Complete type definitions]

### 2. Game Logic (src/utils/gameLogic.ts)
[Function signatures and logic descriptions]

### 3. Level Generation (src/utils/levelGenerator.ts) [if needed]
[Generation algorithm and requirements]

### 4. Components

#### Main Page (src/app/page.tsx)
[Detailed requirements]

#### Lobby Component (src/components/Lobby.tsx)
[Detailed requirements]

#### Game Component (src/components/Game.tsx)
[Detailed requirements]

#### [Additional Components]
[Detailed requirements for each]

### 5. Styling Guidelines
[Visual design specifications]

### 6. Game Mechanics
[Detailed gameplay mechanics and interactions]

### 7. Win/Loss Conditions
[Exact conditions for game completion]

### 8. Polish & UX
[Animations, transitions, feedback mechanisms]

## Success Criteria
- Game is fully playable in web browser
- All mechanics work correctly
- UI is polished and responsive (mobile and desktop)
- Touch interactions work smoothly on mobile browsers
- Code is clean and well-typed
- LocalStorage works correctly
- Ready to deploy to Vercel

## Future Enhancement (Not included in initial implementation)
After the web prototype is validated and working well, Capacitor.js can be integrated to build native Android/iOS APKs. For now, focus on creating an excellent web experience.

Please implement this game completely, ensuring all components work together seamlessly.
```

