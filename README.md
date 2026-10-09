# 🎮 TIC TAC TOE - Modern Web Game

A sleek, responsive, and accessible **Tic Tac Toe** web application built purely with **semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)**. No external frameworks, libraries, or npm dependencies required!

Designed with a cyber-glassmorphism dark aesthetic featuring glowing purple and cyan-blue accents, smooth animations, interactive sound effects (synthesized via Web Audio API), keyboard navigation, and comprehensive score tracking.

---

## 🌟 Key Features

- **2-Player Gameplay**: Turn-based alternation between **Player X** (cyan neon) and **Player O** (purple neon).
- **Dynamic Turn Indicator**: Real-time badge visibly displaying whose turn it is.
- **Smart Win & Draw Detection**: Automatically checks all 8 winning combinations across rows, columns, and diagonals.
- **Winning Combination Highlight**: Pulsing neon aura highlights the specific 3 winning cells.
- **Scoreboard Tracking**: Tracks cumulative wins for **Player X**, **Player O**, and **Draws/Ties**.
- **Round & Score Management**:
  - **New Round**: Clears the 3×3 grid while preserving player scores.
  - **Reset Scores**: Cleans the board and resets all score tallies to 0.
- **Anti-Tamper & Click Prevention**: Occupied cells cannot be clicked again; clicking is disabled after a round ends.
- **Celebratory Announcement Modal**: Displays congratulations message with a 1-click "Play Next Round" action.
- **Synthesized Audio Effects**: Subtle futuristic pops, win arpeggios, and draw chords generated with the **Web Audio API** (requires zero external audio files and includes a 1-click mute toggle).
- **Fully Responsive**: Adapts seamlessly to mobile phones, tablets, laptops, and ultra-wide desktop monitors.
- **Accessibility (a11y) First**: Full keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`), semantic elements, and dynamic `aria-live` and `aria-label` updates.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure (`<main>`, `<header>`, `<section>`, buttons, ARIA attributes) |
| **CSS3** | CSS Grid & Flexbox, CSS Custom Properties (Variables), Glassmorphism, animations |
| **Vanilla JavaScript** | Pure ES6+ game state, win evaluation algorithms, DOM manipulation, Web Audio |
| **Google Fonts** | `Outfit` & `JetBrains Mono` for modern typography |

---

## 🚀 How to Run the Game Locally

Since the game is built with pure web technologies, no build tools, Node.js, or package managers are required!

### Option 1: Direct File Opening
1. Download or clone this repository to your local machine.
2. Double-click `index.html` to open it in your default web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The game will launch automatically at `http://127.0.0.1:5500`.

### Option 3: Using Python HTTP Server
Open your terminal inside the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 📖 Game Rules & Instructions

1. The game is played on a **3×3 grid**.
2. **Player X** always moves first, followed by **Player O**.
3. Players take turns selecting any empty cell on the grid.
4. The first player to align **3 of their marks** horizontally, vertically, or diagonally wins the round.
5. If all 9 cells are occupied without any player achieving 3 in a row, the round ends in a **Draw**.
6. Use the **New Round** button to continue playing with existing scores, or **Reset Scores** to start fresh.

---

## 📁 File Structure

```text
TIC TOC GAME/
│
├── index.html          # Semantic structure & accessible UI components
├── style.css           # Glassmorphism dark theme, animations & responsive grid
├── script.js           # Game engine, winning logic, scoreboard & audio
├── README.md           # Documentation, instructions & deployment guide
└── screenshots/        # Project screenshots and preview graphics
    └── preview.png     # Screenshot placeholder
```

---

## 📸 Screenshots

*(Add your screenshots inside the `screenshots/` directory)*

| Game in Action | Victory Modal |
| :---: | :---: |
| ![Gameplay Preview](screenshots/preview.png) | ![Victory Modal](screenshots/modal.png) |

---

## 🌐 Live Demo & Repository

- **Live Demo:** [https://yourusername.github.io/tic-tac-toe/](https://yourusername.github.io/tic-tac-toe/) *(Replace with your deployed URL)*
- **GitHub Repository:** [https://github.com/yourusername/tic-tac-toe](https://github.com/yourusername/tic-tac-toe)

---

## 🚢 How to Deploy to GitHub Pages

Publish your game online for free in under 2 minutes:

1. Create a new repository on GitHub named `tic-tac-toe`.
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete responsive Tic Tac Toe game"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tic-tac-toe.git
   git push -u origin main
   ```
3. On GitHub, go to your repository's **Settings** tab.
4. On the left sidebar, click **Pages** (under "Code and automation").
5. Under **Build and deployment > Source**, select **Deploy from a branch**.
6. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
7. Wait 1-2 minutes. GitHub will provide your live URL (e.g., `https://<your-username>.github.io/tic-tac-toe/`).

---

## 📄 License & Attribution

This project is open-source and free to use under the [MIT License](https://opensource.org/licenses/MIT). Created for portfolio and web development internship submissions.
