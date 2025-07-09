const cardsArray = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },
];

let gameCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

const section = document.querySelector('#card-section');
const timerEl = document.getElementById('timer');
const stepsEl = document.getElementById('steps');
const resetBtn = document.getElementById('reset');

let flippedCards = [];
let matchedPairs = 0;
let steps = 0;
let timer = null;
let totalSeconds = 0;
let gameStarted = false;

function startTimer() {
  timer = setInterval(() => {
    totalSeconds++;
    timerEl.textContent = formatTime(totalSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  this.classList.add('flipped');
  this.style.color = '#222'; // show letter

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    steps++;
    stepsEl.textContent = steps;

    const [first, second] = flippedCards;

    if (first.dataset.name === second.dataset.name) {
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === cardsArray.length) {
        stopTimer();
        setTimeout(() => alert(`🎉 You matched all letters in ${formatTime(totalSeconds)} with ${steps} steps!`), 300);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.style.color = 'transparent';
        second.style.color = 'transparent';
        flippedCards = [];
      }, 1000);
    }
  }
}

function initGame() {
  gameCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.name = card.name;
    cardDiv.textContent = card.name;
    cardDiv.style.color = 'transparent';
    section.appendChild(cardDiv);

    cardDiv.addEventListener('click', flipCard);
  });
}

resetBtn.addEventListener('click', () => {
  stopTimer();
  totalSeconds = 0;
  timerEl.textContent = "00:00";
  steps = 0;
  stepsEl.textContent = '0';
  matchedPairs = 0;
  flippedCards = [];
  gameStarted = false;

  // Clear cards
  section.innerHTML = '';

  // Reshuffle and recreate cards
  gameCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
  initGame();
});

initGame();
