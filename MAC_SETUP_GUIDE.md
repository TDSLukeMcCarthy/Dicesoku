# Mac Setup Guide for Complete Beginners

## Prerequisites: What You'll Need
This guide assumes you have **never coded before** and will walk you through everything you need to create web games using this workflow.

---

## 🛠️ Required Software (Install in This Order)

### 1. **Homebrew** (Mac Package Manager)
**What it is:** A tool that makes installing other software easy on Mac.

**How to install:**
1. Open **Terminal** app (find it in Applications > Utilities, or press `Cmd + Space` and type "Terminal")
2. Copy and paste this command into Terminal and press Enter:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
3. Follow the on-screen instructions (you may need to enter your Mac password)
4. After installation, close and reopen Terminal

**Test it works:**
```bash
brew --version
```
You should see a version number like `Homebrew 4.x.x`

---

### 2. **Node.js** (JavaScript Runtime)
**What it is:** The engine that runs JavaScript code outside a browser. Next.js needs this.

**How to install:**
```bash
brew install node
```

**Test it works:**
```bash
node --version
npm --version
```
You should see version numbers for both (e.g., `v20.x.x` and `10.x.x`)

---

### 3. **Git** (Version Control)
**What it is:** Tracks changes to your code. Already pre-installed on most Macs, but let's verify.

**Test if you have it:**
```bash
git --version
```

**If you don't have it, install:**
```bash
brew install git
```

**Configure Git (first time only):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### 4. **Cursor IDE** (AI Code Editor)
**What it is:** A smart code editor with Claude AI built-in. This is where you'll paste the generated prompts.

**How to install:**
1. Go to [https://cursor.sh](https://cursor.sh)
2. Click "Download for Mac"
3. Open the downloaded file and drag Cursor to Applications
4. Open Cursor from Applications
5. Sign up for a Cursor account (free trial available)

---

## 🌐 Online Accounts Needed

### 5. **GitHub Account** (Optional but Recommended)
**What it is:** Store your code online, back it up, and deploy from here.

**How to set up:**
1. Go to [https://github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process
4. Verify your email

---

### 6. **Vercel Account** (For Hosting Your Games)
**What it is:** Free hosting service that makes your games live on the internet.

**How to set up:**
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up"
3. **Important:** Choose "Continue with GitHub" (makes deployment easier)
4. Authorize Vercel to access your GitHub account

---

## 📱 Optional: For ChatGPT

### 7. **ChatGPT Account** (For Generating Cursor Prompts)
**What it is:** AI that will turn your game ideas into detailed technical prompts.

**How to set up:**
1. Go to [https://chat.openai.com](https://chat.openai.com)
2. Sign up for an account
3. Free tier works, but ChatGPT Plus ($20/month) is recommended for better results

---

## ✅ Verify Your Setup

Open Terminal and run these commands to make sure everything is installed:

```bash
# Check Homebrew
brew --version

# Check Node.js
node --version

# Check npm (comes with Node)
npm --version

# Check Git
git --version
```

All commands should return version numbers without errors.

---

## 🎮 Your First Project - Step by Step

### Step 1: Create a Project Folder
```bash
# Navigate to Desktop
cd ~/Desktop

# Create a folder for your game projects
mkdir Game-Prototypes

# Enter the folder
cd Game-Prototypes
```

### Step 2: Generate a Cursor Prompt with ChatGPT
1. Open ChatGPT
2. Discuss your game idea until it's clear
3. Paste the contents of `CHATGPT_PROMPT.txt` into ChatGPT
4. ChatGPT will generate a complete technical prompt
5. Copy the entire generated prompt

### Step 3: Create the Game in Cursor
1. Open Cursor
2. Click "New Project" or press `Cmd + N`
3. Choose your `Game-Prototypes` folder as the location
4. Name your project (e.g., "TicTacToe" or "CardMatch")
5. Press `Cmd + L` to open the AI chat
6. Paste the generated prompt from ChatGPT
7. Watch Claude build your game! ✨

### Step 4: Run Your Game Locally
1. In Cursor, open the Terminal (View > Terminal, or press `Ctrl + ~`)
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open your browser to `http://localhost:3000`
5. Your game is running! 🎉

### Step 5: Deploy to Vercel (Make it Live!)

**Option A: Using Vercel CLI (Easy)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel --prod
```
Follow the prompts, and you'll get a live URL!

**Option B: Using GitHub + Vercel (Recommended)**
1. In Cursor Terminal:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it (e.g., "my-game")
   - Click "Create repository"

3. Connect and push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

4. Deploy with Vercel:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Wait 30-60 seconds
   - Get your live URL! 🚀

---

## 🆘 Common Issues & Solutions

### "Command not found"
**Problem:** Terminal doesn't recognize a command like `npm` or `git`

**Solution:**
1. Close and reopen Terminal
2. Make sure you completed the installation steps
3. Try restarting your Mac

### "Permission denied"
**Problem:** You don't have permission to install something

**Solution:** Add `sudo` before the command (you'll need to enter your Mac password):
```bash
sudo npm install -g vercel
```

### "Port 3000 is already in use"
**Problem:** Another app is using port 3000

**Solution:**
1. Stop the other server (press `Ctrl + C` in its Terminal)
2. Or use a different port:
```bash
npm run dev -- -p 3001
```

### "Git not configured"
**Problem:** Git doesn't know who you are

**Solution:** Configure Git with your info:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 📚 Basic Terminal Commands to Know

```bash
# See where you are
pwd

# List files in current folder
ls

# Change directory
cd folder-name

# Go up one level
cd ..

# Go to home directory
cd ~

# Clear the terminal screen
clear

# Stop a running process
Ctrl + C
```

---

## 💡 Tips for Success

1. **Start Simple:** Your first game should be easy (Tic-Tac-Toe, Memory Card game, etc.)
2. **Test in Browser First:** Always run locally (`npm run dev`) before deploying
3. **Save Your Work:** Commit to Git regularly
4. **Use ChatGPT for Help:** If something breaks, paste the error into ChatGPT
5. **Mobile Testing:** After deploying, test your game on your phone's browser
6. **Read the Code:** Let Cursor explain what the code does (select code and ask Claude)

---

## 🎯 Quick Reference: The Workflow

```
1. 💭 Brainstorm game idea → ChatGPT
2. 📝 Generate prompt → Copy from ChatGPT
3. 🤖 Paste prompt → Cursor AI
4. ⚙️ Build game → Claude creates files
5. 🧪 Test locally → npm run dev
6. 🚀 Deploy → Vercel
7. 🎮 Play & share → Send URL to friends!
```

---

## 🆓 Cost Breakdown

- **Node.js:** Free
- **Git:** Free
- **Cursor:** Free trial, then $20/month for Pro
- **ChatGPT:** Free tier available, Plus is $20/month
- **GitHub:** Free for public repos
- **Vercel:** Free for personal projects (generous limits)

**Total minimum cost:** $0/month (using free tiers)
**Recommended cost:** $40/month (Cursor Pro + ChatGPT Plus)

---

## 🎓 Next Steps After Setup

1. **Watch a Next.js Tutorial:** Understand the basics (search YouTube for "Next.js beginner tutorial")
2. **Learn TypeScript Basics:** 1-hour crash course will help
3. **Explore Tailwind CSS:** Learn how styling works in these projects
4. **Experiment:** Change colors, text, add features
5. **Build Multiple Games:** Each one teaches you more

---

## 📞 Getting Help

- **Cursor Issues:** [cursor.sh/docs](https://cursor.sh/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Help:** [vercel.com/docs](https://vercel.com/docs)
- **Stack Overflow:** Search for error messages
- **ChatGPT:** Paste errors and ask for help!

---

## 🎉 You're Ready!

You now have everything you need to:
- ✅ Generate game prompts with ChatGPT
- ✅ Build games with Cursor AI
- ✅ Test games on your Mac
- ✅ Deploy games live to the internet
- ✅ Share games with anyone

**Time to build something awesome! 🚀**

