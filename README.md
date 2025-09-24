# Dicesoku

A strategic dice placement puzzle game built with Next.js and TypeScript.

## 🎮 Game Description

Dicesoku is a logic puzzle game where players place dice on a grid to match target sums for each row and column. Think of it as a combination of Sudoku and dice games!

## ✨ Features

- **Multiple Grid Sizes**: Choose from 3×3 to 9×9 grids for different difficulty levels
- **Drag & Drop Interface**: Intuitive drag-and-drop or click-to-place dice
- **Visual Dice**: Beautiful pip-style dice display on the grid
- **Real-time Feedback**: Live sum tracking with color-coded targets
- **Undo System**: 5 undos per level for strategic corrections
- **Progressive Difficulty**: Procedurally generated levels with increasing complexity
- **Responsive Design**: Works great on desktop and mobile devices

## 🎯 How to Play

1. **Select a Grid Size**: Choose your preferred difficulty (3×3 to 9×9)
2. **Place Dice**: Drag dice from the pool to empty cells or click to select and place
3. **Match Targets**: Make each row and column sum equal to the target numbers
4. **Strategic Planning**: You can exceed targets (they'll show in red) while planning your moves
5. **Win Condition**: Use all dice and match all targets exactly

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TDSLukeMcCarthy/Dicesoku.git
cd Dicesoku
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## 🎨 Game Features

### Visual Design
- Inset grid cells for a tactile board game feel
- Black dice pips for clear visibility
- Rounded corners and smooth animations
- Color-coded feedback (green = complete, red = over target)

### Gameplay Mechanics
- **Level Generator**: Procedurally creates solvable puzzles
- **Flexible Strategy**: Players can exceed targets temporarily
- **Smart Validation**: Real-time feedback without blocking moves
- **Progress Saving**: Level progress saved in browser storage

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Large Grids (3×3-5×5)**: Full-size cells and dice
- **Medium Grids (6×6-7×7)**: Optimized for readability
- **Small Grids (8×8-9×9)**: Compact layout for complex puzzles

## 🎯 Game Rules

- Place dice to make row and column sums match the target numbers
- All dice from the pool must be used
- You can temporarily exceed targets (shown in red)
- Win by matching all targets exactly with all dice placed
- Use undos strategically - you only get 5 per level

## 🔄 Future Enhancements

- [ ] Online leaderboards
- [ ] Daily challenges
- [ ] Hint system
- [ ] Sound effects and animations
- [ ] Tournament mode
- [ ] Custom puzzle creator

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and TypeScript