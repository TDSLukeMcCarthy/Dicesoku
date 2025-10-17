# 🎮 Game Prototype Workflow
## From Idea to Deployed Game in Minutes

This folder contains everything you need to rapidly prototype web games using AI.

---

## 📁 Files in This Folder

| File | Purpose | Who Uses It |
|------|---------|-------------|
| **CHATGPT_PROMPT.txt** | Template to paste into ChatGPT to generate Cursor prompts | You → ChatGPT |
| **CURSOR_PROMPT_GENERATOR.md** | Detailed explanation of the prompt structure | Reference/Learning |
| **MAC_SETUP_GUIDE.md** | Complete beginner's setup guide (30 min read) | First-time setup |
| **QUICK_SETUP_CHECKLIST.md** | TL;DR version of setup (5 min read) | Quick reference |
| **WORKFLOW_README.md** | This file - overview of the entire process | Start here! |

---

## 🔄 The Complete Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR GAME IDEA                           │
│          "I want to make a [game concept]..."                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Discuss with ChatGPT                               │
│  • Describe your game concept                                │
│  • Clarify mechanics, rules, win/loss conditions            │
│  • Refine until the idea is clear                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Generate Technical Prompt                          │
│  • Paste CHATGPT_PROMPT.txt into ChatGPT                    │
│  • ChatGPT generates a detailed Cursor/Claude prompt        │
│  • Copy the entire generated prompt                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Build in Cursor                                    │
│  • Open Cursor IDE                                           │
│  • Press Cmd+L to open AI chat                              │
│  • Paste the generated prompt                               │
│  • Claude builds your entire game!                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Test Locally                                       │
│  • npm install                                               │
│  • npm run dev                                               │
│  • Open http://localhost:3000                               │
│  • Play and test your game                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Deploy to Vercel                                   │
│  • vercel --prod                                             │
│  • Get live URL                                              │
│  • Share with anyone!                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: Test on Mobile                                     │
│  • Open URL on phone/tablet browser                         │
│  • Verify touch interactions work                           │
│  • Test responsive design                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  OPTIONAL: Add Native App                                   │
│  • If web prototype is successful                           │
│  • Integrate Capacitor.js                                   │
│  • Build APK for Android/iOS                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 What Gets Generated

Every game follows this consistent structure:

```
your-game/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main orchestrator
│   │   ├── layout.tsx        # App wrapper
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Lobby.tsx         # Menu/settings screen
│   │   ├── Game.tsx          # Main game controller
│   │   └── [GameElements].tsx # Game-specific components
│   ├── types/
│   │   └── game.ts           # TypeScript definitions
│   └── utils/
│       ├── gameLogic.ts      # Core mechanics
│       └── levelGenerator.ts # Procedural generation (if needed)
├── package.json              # Dependencies
└── next.config.ts            # Next.js config
```

---

## 🛠️ Tech Stack (All Games Use)

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS 4** - Rapid styling
- **Shadcn UI** - Beautiful components
- **Lucide Icons** - Icon library
- **Framer Motion** - Smooth animations
- **LocalStorage** - Save progress
- **Vercel** - Free hosting

---

## 🆕 First Time? Start Here

### Never Coded Before?
1. Read **MAC_SETUP_GUIDE.md** (30 minutes)
2. Install all required software
3. Come back here!

### Already Have Dev Tools?
1. Skim **QUICK_SETUP_CHECKLIST.md** (5 minutes)
2. Verify you have Node, Git, Cursor
3. Start building!

---

## 💡 Example: Build Tic-Tac-Toe

### 1. Chat with ChatGPT
```
"I want to make a Tic-Tac-Toe game where two players take turns.
The first player to get 3 in a row wins. Include a reset button
and track wins for each player."
```

### 2. Generate Prompt
*Paste CHATGPT_PROMPT.txt → Get detailed technical prompt*

### 3. Build in Cursor
*Paste prompt → Claude creates 8-10 files → Done in 2 minutes*

### 4. Run Locally
```bash
npm install
npm run dev
```
Open http://localhost:3000 → Play Tic-Tac-Toe!

### 5. Deploy
```bash
vercel --prod
```
Get URL like: `https://tic-tac-toe-abc123.vercel.app`

### 6. Share
Send URL to friends → They play instantly in browser!

**Total time: ~15 minutes** ⚡

---

## 🎨 Game Ideas to Try

### Easy (Great for First Project)
- ✅ Tic-Tac-Toe
- ✅ Memory/Matching Cards
- ✅ Rock-Paper-Scissors
- ✅ Whack-a-Mole
- ✅ Simon Says

### Medium (After First Success)
- ✅ 2048 Clone
- ✅ Wordle Clone
- ✅ Snake Game
- ✅ Minesweeper
- ✅ Sudoku

### Advanced (When You're Confident)
- ✅ Tower Defense
- ✅ Card Battle Game
- ✅ Puzzle Platformer
- ✅ Match-3 (Candy Crush style)
- ✅ Roguelike Dungeon

---

## 🏗️ Architecture Patterns

All games follow these conventions:

### 1. **Lobby Component**
- Game title and branding
- Settings/toggles
- Difficulty selection
- Current progress display
- Big "Play" button
- How to play instructions

### 2. **Game Component**
- Manages GameState
- Handles level initialization
- Win/loss detection
- Score/stats display
- "Back to Lobby" button

### 3. **Game Logic (Pure Functions)**
- No side effects
- State → Action → New State
- Easy to test
- Easy to debug

### 4. **Type Safety**
- All interfaces in types/game.ts
- Strict TypeScript
- Autocomplete everywhere
- Catch errors early

---

## 🚀 Optimization Tips

### Make Games Load Faster
- Use Next.js Image component
- Lazy load heavy components
- Minimize bundle size

### Make Games Feel Smooth
- Use Framer Motion for animations
- Add loading states
- Debounce rapid actions

### Make Games Mobile-Friendly
- Touch targets min 44x44px
- Test on actual devices
- Consider landscape/portrait
- Prevent zoom on inputs

---

## 🐛 Debugging Workflow

### If Something Breaks:
1. **Check Cursor Terminal** - Red errors shown there
2. **Open Browser Console** - F12 or Cmd+Option+I
3. **Copy Error Message** - Paste into ChatGPT
4. **Ask Claude in Cursor** - Select code + ask "Why is this breaking?"
5. **Read Type Errors** - TypeScript tells you exactly what's wrong

### Common Issues:
- **Type errors** → Check types/game.ts matches usage
- **Import errors** → Check file paths (@ is alias for src/)
- **State not updating** → Make sure you're creating new objects, not mutating
- **Build fails** → Check for unused imports, fix linter errors

---

## 📈 Progression Path

### Week 1: Build Your First Game
- Follow the workflow exactly
- Use a simple game idea
- Get comfortable with the tools
- Deploy and share!

### Week 2: Customize and Iterate
- Change colors and styling
- Add new features
- Ask Claude to explain code
- Learn TypeScript basics

### Week 3: Build Something Original
- Design your own game
- Use the patterns you learned
- Experiment with animations
- Add sound (using Howler.js or similar)

### Week 4: Share and Polish
- Get feedback from players
- Fix bugs and improve UX
- Consider adding native app
- Build your portfolio!

---

## 💰 Costs

| Tool | Free Tier | Paid Option | Needed? |
|------|-----------|-------------|---------|
| **Node.js** | Free | N/A | ✅ Required |
| **Git** | Free | N/A | ✅ Required |
| **Cursor** | Trial | $20/mo | ✅ Required |
| **ChatGPT** | Limited | $20/mo Plus | ⚠️ Recommended |
| **GitHub** | Free | N/A | ✅ Required |
| **Vercel** | Free | $20/mo Pro | ✅ Free tier is fine |

**Minimum cost:** $20/month (Cursor only)  
**Recommended cost:** $40/month (Cursor + ChatGPT Plus)

---

## 🎓 Learning Resources

### Understanding the Code
- Ask Claude in Cursor: "Explain this file to me"
- Read Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Learn TypeScript: [typescriptlang.org/docs](https://typescriptlang.org/docs)

### Improving Design
- Tailwind docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Shadcn components: [ui.shadcn.com](https://ui.shadcn.com)
- Framer Motion: [framer.com/motion](https://framer.com/motion)

### Game Dev Concepts
- YouTube: "JavaScript game development"
- Game programming patterns
- State machine basics

---

## 🤝 Getting Help

1. **Ask Claude in Cursor** - Highlight code + ask questions
2. **Ask ChatGPT** - Paste errors or describe problems
3. **Check the Guides** - MAC_SETUP_GUIDE.md has troubleshooting
4. **Google the Error** - Most issues have Stack Overflow answers
5. **Read the Docs** - Official docs are surprisingly helpful

---

## 🎉 Success Stories

This exact workflow was used to build:
- **Dicesoku** - The dice puzzle game in this folder
- *[Your game will be next!]*

---

## 🚦 Quick Start (5 Minutes)

1. ✅ Ensure setup complete (see QUICK_SETUP_CHECKLIST.md)
2. 💭 Open ChatGPT, describe your game idea
3. 📋 Paste CHATGPT_PROMPT.txt → Get Cursor prompt
4. 🤖 Open Cursor, paste prompt, let Claude build
5. ⚙️ Run `npm install && npm run dev`
6. 🎮 Play your game at localhost:3000
7. 🚀 Deploy with `vercel --prod`

**You just built and deployed a game!** 🎊

---

## 📞 Questions?

- **Setup issues?** → MAC_SETUP_GUIDE.md
- **Workflow unclear?** → Read this file again
- **Code not working?** → Ask Claude in Cursor
- **Game idea stuck?** → ChatGPT brainstorming session

---

**Happy Building! 🚀🎮**

