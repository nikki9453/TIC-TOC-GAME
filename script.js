

(function () {
  'use strict';

  // ---------------- GAME CONSTANTS ----------------
  const PLAYER_X = 'X';
  const PLAYER_O = 'O';

  // 8 Winning Combinations on a 3x3 Grid:
  // Rows: [0,1,2], [3,4,5], [6,7,8]
  // Cols: [0,3,6], [1,4,7], [2,5,8]
  // Diagonals: [0,4,8], [2,4,6]
  const WINNING_COMBINATIONS = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diagonal Top-Left to Bottom-Right
    [2, 4, 6]  // Diagonal Top-Right to Bottom-Left
  ];

  // ---------------- STATE VARIABLES ----------------
  let boardState = Array(9).fill('');
  let currentPlayer = PLAYER_X;
  let isGameActive = true;
  let isSoundEnabled = true;

  const scores = {
    x: 0,
    o: 0,
    ties: 0
  };

  // ---------------- DOM ELEMENT SELECTORS ----------------
  const cells = document.querySelectorAll('.cell');
  const turnBadge = document.getElementById('turnBadge');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');
  const scoreTiesEl = document.getElementById('scoreTies');
  const newRoundBtn = document.getElementById('newRoundBtn');
  const resetScoreBtn = document.getElementById('resetScoreBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIconEl = document.getElementById('soundIcon');

  // Modal Elements
  const resultModal = document.getElementById('resultModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalPlayAgainBtn = document.getElementById('modalPlayAgainBtn');

  // ---------------- SOUND EFFECTS (WEB AUDIO API) ----------------
  // Pure synthesized browser audio - zero external audio asset dependencies!
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        // Subtle futuristic click pop
        const freq = currentPlayer === PLAYER_X ? 520 : 680;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'win') {
        // Melodic celebratory arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.type = 'triangle';
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.09);
          noteGain.gain.setValueAtTime(0.18, now + idx * 0.09);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
          noteOsc.start(now + idx * 0.09);
          noteOsc.stop(now + idx * 0.09 + 0.25);
        });
      } else if (type === 'draw') {
        // Gentle neutral draw chord
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.22);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch (e) {
      // Audio playback fails gracefully if audio context restricted
    }
  }

  // ---------------- GAME CORE LOGIC ----------------

  /**
   * Handles user interaction on a grid cell.
   * @param {HTMLElement} cell 
   * @param {number} index 
   */
  function handleCellClick(cell, index) {
    // Disallow clicking if cell is already occupied or game is over
    if (boardState[index] !== '' || !isGameActive) {
      return;
    }

    // Update internal board representation
    boardState[index] = currentPlayer;

    // Update DOM Cell
    cell.textContent = currentPlayer === PLAYER_X ? '✕' : '◯';
    cell.classList.add(currentPlayer.toLowerCase());
    cell.classList.add('occupied');
    cell.setAttribute('aria-label', `Cell ${index + 1}, Occupied by Player ${currentPlayer}`);

    playSound('click');

    // Check for round win or draw
    evaluateRound();
  }

  /**
   * Evaluates if current player won, if board is full (draw), or toggles turn.
   */
  function evaluateRound() {
    let roundWon = false;
    let winningLine = null;

    // Check all 8 winning combinations
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        roundWon = true;
        winningLine = [a, b, c];
        break;
      }
    }

    if (roundWon && winningLine) {
      handleWin(winningLine);
      return;
    }

    // Check if all cells are filled (Draw)
    const isRoundDraw = !boardState.includes('');
    if (isRoundDraw) {
      handleDraw();
      return;
    }

    // Switch turns
    switchPlayerTurn();
  }

  /**
   * Handles round win outcome.
   * @param {number[]} winningIndices 
   */
  function handleWin(winningIndices) {
    isGameActive = false;

    // Highlight winning cells
    winningIndices.forEach((index) => {
      cells[index].classList.add('winning-cell');
    });

    // Update Score
    if (currentPlayer === PLAYER_X) {
      scores.x++;
      scoreXEl.textContent = scores.x;
    } else {
      scores.o++;
      scoreOEl.textContent = scores.o;
    }

    playSound('win');

    // Display Result Modal after brief delay so player sees winning line
    setTimeout(() => {
      showResultModal(
        `Player ${currentPlayer} Wins!`,
        `Tremendous move! Player ${currentPlayer} dominated this round.`
      );
    }, 450);
  }

  /**
   * Handles draw outcome.
   */
  function handleDraw() {
    isGameActive = false;
    scores.ties++;
    scoreTiesEl.textContent = scores.ties;

    playSound('draw');

    setTimeout(() => {
      showResultModal(
        `It's a Draw!`,
        `A fierce standoff! Both players played flawlessly.`
      );
    }, 350);
  }

  /**
   * Toggles active player between X and O.
   */
  function switchPlayerTurn() {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    updateTurnIndicator();
  }

  /**
   * Updates turn indicator badge & visuals.
   */
  function updateTurnIndicator() {
    if (currentPlayer === PLAYER_X) {
      turnBadge.className = 'badge player-x-badge';
      turnBadge.innerHTML = '<span class="badge-icon">✕</span> Player X';
    } else {
      turnBadge.className = 'badge player-o-badge';
      turnBadge.innerHTML = '<span class="badge-icon">◯</span> Player O';
    }
  }

  /**
   * Displays victory / draw announcement modal.
   * @param {string} title 
   * @param {string} message 
   */
  function showResultModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    resultModal.removeAttribute('hidden');
    modalPlayAgainBtn.focus();
  }

  /**
   * Hides the announcement modal.
   */
  function hideResultModal() {
    resultModal.setAttribute('hidden', '');
  }

  /**
   * Resets the game board for a new round while keeping scores intact.
   */
  function startNewRound() {
    boardState = Array(9).fill('');
    isGameActive = true;
    currentPlayer = PLAYER_X;

    cells.forEach((cell, index) => {
      cell.textContent = '';
      cell.className = 'cell';
      cell.setAttribute('aria-label', `Cell ${index + 1}, Empty`);
    });

    updateTurnIndicator();
    hideResultModal();
  }

  /**
   * Resets both the game board and all tracked scores.
   */
  function resetAllScores() {
    scores.x = 0;
    scores.o = 0;
    scores.ties = 0;
    scoreXEl.textContent = '0';
    scoreOEl.textContent = '0';
    scoreTiesEl.textContent = '0';
    startNewRound();
  }

  /**
   * Toggles sound on/off.
   */
  function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundIconEl.textContent = isSoundEnabled ? '🔊' : '🔇';
    soundToggleBtn.setAttribute(
      'aria-label',
      isSoundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'
    );
  }

  // ---------------- EVENT LISTENERS ----------------

  // Grid Cell Click & Keyboard Interactions
  cells.forEach((cell) => {
    const index = parseInt(cell.getAttribute('data-index'), 10);

    cell.addEventListener('click', () => {
      handleCellClick(cell, index);
    });

    // Keyboard support: Space or Enter triggers cell
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCellClick(cell, index);
      }
    });
  });

  // Action Buttons
  newRoundBtn.addEventListener('click', startNewRound);
  resetScoreBtn.addEventListener('click', resetAllScores);
  modalPlayAgainBtn.addEventListener('click', startNewRound);
  soundToggleBtn.addEventListener('click', toggleSound);

  // Close modal when pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !resultModal.hasAttribute('hidden')) {
      hideResultModal();
    }
  });

  // Initialize display
  updateTurnIndicator();

})();
