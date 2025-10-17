# ⚡ Quick Setup Checklist for Mac

**Time needed:** ~30 minutes for complete beginners

---

## ✅ Installation Checklist

### Step 1: Open Terminal
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

---

### Step 2: Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
⏱️ Takes 5-10 minutes

---

### Step 3: Install Node.js
```bash
brew install node
```
⏱️ Takes 3-5 minutes

---

### Step 4: Verify Git (Usually Pre-installed)
```bash
git --version
```
If not installed:
```bash
brew install git
```

---

### Step 5: Configure Git
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### Step 6: Download Cursor IDE
1. Visit [cursor.sh](https://cursor.sh)
2. Download for Mac
3. Install and sign up

---

### Step 7: Create Accounts
- [ ] [GitHub Account](https://github.com) - Free
- [ ] [Vercel Account](https://vercel.com) - Sign up with GitHub
- [ ] [ChatGPT Account](https://chat.openai.com) - Free or Plus

---

## ✅ Verification

Run these commands in Terminal - all should show version numbers:

```bash
brew --version
node --version
npm --version
git --version
```

---

## 🚀 Ready to Build!

You're all set! Follow these steps:

1. **Create project folder:**
   ```bash
   cd ~/Desktop
   mkdir Game-Prototypes
   cd Game-Prototypes
   ```

2. **Generate prompt in ChatGPT**
   - Use `CHATGPT_PROMPT.txt`

3. **Paste prompt in Cursor**
   - `Cmd + L` to open AI chat
   - Paste and let Claude build

4. **Run your game:**
   ```bash
   npm install
   npm run dev
   ```

5. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

---

## 💰 Cost Summary
- **Minimum:** $0/month (all free tiers)
- **Recommended:** $40/month (Cursor Pro + ChatGPT Plus)

---

## 🆘 Problems?
See **MAC_SETUP_GUIDE.md** for detailed troubleshooting!

