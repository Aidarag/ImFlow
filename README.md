# ImFlow ⚡️

> **Personal Flow & Mindful Planning for Aïda Garba**  
> A private, distraction-free productivity web app built for academic, athletic, and creative flow.

---

## 🌟 Overview

**ImFlow** is custom-designed for student-athlete Aïda Garba at Cal State Fullerton (Fall 2026). It combines the familiarity of a Canvas LMS dashboard with calm productivity principles: low-cognitive-load prioritization, protected Python study blocks, varsity tennis match readiness, and quick thought capture.

### Key Highlights
- **Canvas-Inspired 3-Column Dashboard**: Exact proportion recreation of the laptop screen layout with a 152px compact sidebar, 3-column course grid (6 courses), and a right-hand To-Do panel.
- **2×3 Interactive Widget Grid**:
  - `8` **Calculator**: Quick arithmetic during study blocks.
  - `⏱` **Flow Focus Timer**: Pomodoro intervals (25m Focus / 5m Rest) with hydration prompts.
  - `♫` **Study Audio**: Calming ambient soundscapes (Lo-Fi, Brown Noise, Rain, Forest).
  - `”` **Affirmations**: Daily mindful quotes tailored for student-athletes.
  - `📋` **Scratchpad Notes**: Persistent auto-saving scratchpad for raw ideas.
  - `✓` **Daily Habit Checklist**: Hydration, mobility, tennis prep, and daily code commits.
- **Dual Concentric Progress Ring**:
  - Outer Lime ring tracking weekly course assignment completion.
  - Inner Lavender ring tracking daily study/habit commitments.
  - Center fraction & percentage (`80%`, `4/5`).
- **Student-Athlete Life Spaces**:
  - 🎓 **School & Courses**: Predictive Analytics (ANLT 410), Business Analytics (BUSA 380), Systems Analysis & Design (IS 330).
  - 🐍 **Tech & Python Practice**: 60-minute protected daily habit, Pandas & LeetCode tracking.
  - 🎾 **Varsity Tennis**: Court schedules, racquet string tension, match prep, recovery.
  - 🎬 **Creative Lab**: Campus tour reels, video voiceovers, YouTube episodes.
  - 🌿 **Personal & Health**: Hydration logging, sleep, and recovery routines.
- **Low Energy & Schedule Shift Modes**: Reorder or push non-essential tasks to tomorrow with zero guilt when practice runs late or energy is low.

---

## 🎨 Color Palette & Design System

The application strictly uses the curated ImFlow palette:

| Color | Hex | Role |
| :--- | :--- | :--- |
| **White (Primary)** | `#FFFFFF` | Primary background, card bodies, active navigation pill |
| **Lavender** | `#C5B2DC` | Inner progress ring, action badges, subtle borders, card hover glows |
| **Lime** | `#E9FFA3` | Outer progress ring, notification pills, primary interactive highlights |
| **Black** | `#0A0A0A` | Deep sidebar background, high-contrast headings, and typography |

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS with customized tokens, glassmorphism, and responsive CSS Grid
- **Icons**: [Lucide React](https://lucide.dev)
- **Typography**: Playfair Display (editorial headings), Outfit, and Plus Jakarta Sans

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Aidarag/ImFlow.git
cd ImFlow
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 📄 License
Private project for personal use. All rights reserved.
