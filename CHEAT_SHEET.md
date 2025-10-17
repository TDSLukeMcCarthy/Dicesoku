# 🎮 Game Prototyping Cheat Sheet

## 🚀 5-Minute Workflow

```
Idea → ChatGPT → Cursor → Test → Deploy → Share
  1️⃣      2️⃣       3️⃣      4️⃣      5️⃣       6️⃣
```

---

## 📝 Essential Commands

### First Time Setup (Once Only)
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Vercel CLI
npm install -g vercel
```

### Every New Project
```bash
# Create project folder
cd ~/Desktop/Game-Prototypes
mkdir my-game
cd my-game

# After Cursor builds the files:
npm install          # Install dependencies
npm run dev          # Run locally at localhost:3000
```

### Deploy to Production
```bash
vercel login         # First time only
vercel --prod        # Deploy and get URL
```

---

## 🎯 The 6 Steps

### 1️⃣ **Brainstorm** (ChatGPT)
"I want to make a [game type] where [mechanics]. Win by [condition]."

### 2️⃣ **Generate Prompt** (ChatGPT)
Paste `CHATGPT_PROMPT.txt` → Copy output

### 3️⃣ **Build** (Cursor)
`Cmd + L` → Paste prompt → Wait 2 minutes

### 4️⃣ **Test** (Terminal)
```bash
npm install
npm run dev
```

### 5️⃣ **Deploy** (Vercel)
```bash
vercel --prod
```

### 6️⃣ **Share** (Anywhere!)
Copy URL → Send to friends

---

## 🛠️ Required Software

| Software | How to Get | Cost |
|----------|-----------|------|
| Terminal | Pre-installed | Free |
| Homebrew | See command above | Free |
| Node.js | `brew install node` | Free |
| Git | Pre-installed on Mac | Free |
| Cursor | [cursor.sh](https://cursor.sh) | $20/mo |
| ChatGPT | [chat.openai.com](https://chat.openai.com) | $0-20/mo |
| GitHub | [github.com](https://github.com) | Free |
| Vercel | [vercel.com](https://vercel.com) | Free |

---

## 📁 Project Structure (Every Game)

```
my-game/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← Screen navigation
│   │   └── globals.css       ← Styles
│   ├── components/
│   │   ├── Lobby.tsx         ← Menu/settings
│   │   ├── Game.tsx          ← Main game
│   │   └── [Elements].tsx    ← Game pieces
│   ├── types/
│   │   └── game.ts           ← TypeScript types
│   └── utils/
│       ├── gameLogic.ts      ← Core mechanics
│       └── levelGenerator.ts ← Auto-generate levels
└── package.json              ← Dependencies
```

---

## 🧩 Tech Stack (Automatic)

✅ Next.js 15+ (React framework)  
✅ TypeScript (Type safety)  
✅ Tailwind CSS (Styling)  
✅ Shadcn UI (Components)  
✅ Lucide Icons (Icons)  
✅ Framer Motion (Animations)  
✅ LocalStorage (Save progress)  

---

## ⚡ Terminal Quick Reference

```bash
# Navigation
pwd                  # Where am I?
ls                   # What's here?
cd folder-name       # Go into folder
cd ..                # Go up one level
cd ~                 # Go home

# Git
git init             # Start tracking
git add .            # Stage all changes
git commit -m "msg"  # Save checkpoint
git push             # Upload to GitHub

# npm
npm install          # Install packages
npm run dev          # Start dev server
npm run build        # Build for production

# Process Control
Ctrl + C             # Stop current process
clear                # Clear screen
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Command not found" | Close/reopen Terminal or restart Mac |
| "Port in use" | Stop other server (Ctrl+C) or use `-p 3001` |
| "Permission denied" | Add `sudo` before command |
| Type errors | Check `types/game.ts` matches usage |
| Won't deploy | Run `npm run build` first to check for errors |
| Git errors | Configure: `git config --global user.name "Name"` |

---

## 🎨 Game Ideas (Difficulty)

**⭐ Easy (Start Here)**
- Tic-Tac-Toe
- Memory Match
- Rock-Paper-Scissors
- Color Guessing
- Number Guessing

**⭐⭐ Medium**
- 2048 Clone
- Wordle Clone
- Snake
- Minesweeper
- Connect Four

**⭐⭐⭐ Advanced**
- Card Battle
- Tower Defense
- Match-3 Puzzle
- Roguelike
- Physics Platformer

---

## 📱 Testing Checklist

✅ Desktop browser (Chrome/Safari)  
✅ Mobile browser (iOS Safari/Chrome Android)  
✅ Touch interactions work  
✅ Buttons are big enough (44px minimum)  
✅ Game fits screen (no scrolling needed)  
✅ LocalStorage saves progress  
✅ Refresh doesn't lose data  
✅ Win/loss conditions work  

---

## 🎯 Quality Checklist

### Before Deploying:
- [ ] Game is fully playable
- [ ] No console errors
- [ ] Win condition works
- [ ] Loss condition works
- [ ] Settings save/load
- [ ] Mobile responsive
- [ ] Instructions clear
- [ ] Back to lobby works

---

## 💡 Pro Tips

1. **Start simple** - Build Tic-Tac-Toe before building Fortnite
2. **Test early** - Run `npm run dev` often
3. **Save often** - Git commit after each feature
4. **Ask questions** - Claude and ChatGPT are there to help
5. **Learn gradually** - You don't need to understand everything at once
6. **Have fun** - Build games YOU want to play!

---

## 🔗 Important Links

- Cursor: [cursor.sh](https://cursor.sh)
- ChatGPT: [chat.openai.com](https://chat.openai.com)
- GitHub: [github.com](https://github.com)
- Vercel: [vercel.com](https://vercel.com)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Tailwind: [tailwindcss.com](https://tailwindcss.com)
- Shadcn: [ui.shadcn.com](https://ui.shadcn.com)

---

## 🎉 Your First 15 Minutes

```
 0:00 → Open ChatGPT, describe game
 2:00 → Paste CHATGPT_PROMPT.txt
 3:00 → Copy generated prompt
 4:00 → Open Cursor, paste prompt
 6:00 → Wait for Claude to build
 8:00 → npm install
 9:00 → npm run dev
10:00 → Play at localhost:3000!
12:00 → vercel --prod
15:00 → Share URL with friends! 🎮
```

---

**Print this page and keep it next to your computer!** 📄✨

