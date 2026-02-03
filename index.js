function renderGameContainer() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
    <div class="game-info">
      <div> Timer: <span id="timer">0</span>s</div>
      <div>Move: <span id="moves">0</span></div>
      <div>Matched: <span id="matched">0</span>/8</div>
    </div>
    <div class="card-container"></div>
    <button class="reset-btn">Reset Game</button>
    <p class="win-message"></p>
  `;
}
renderGameContainer();

//-- initial game values
const cardsData = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
  { id: 3, value: "C" },
  { id: 4, value: "D" },
  { id: 5, value: "E" },
  { id: 6, value: "F" },
  { id: 7, value: "G" },
  { id: 8, value: "H" },
];
let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matched = 0;
let timer = 0;
let gameTimer = null;
let lockBoard = false; // for avoid extra clicks
//--
function loadCards() {
  cards = shuffleCards([...cardsData, ...cardsData]);
}
//-- making spaghetti of cards
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//-- creating cards
function createCards() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  loadCards();
  cards = shuffleCards([...cards]); // randomize card place by every rest

  cards.forEach((cardsData) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = cardsData.id;
    card.dataset.value = cardsData.value;

    card.innerHTML = `
      <div class="card-inner">
        <div class="front"></div>
        <div class="back">${letter}</div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
  addCardClickListeners();
}
createCards();

//-- defining click for cards
function addCardClickListeners() {
  const gameCards = document.querySelectorAll(".card");
  gameCards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
  });
}

//-- handling click for cards
function handleCardClick(card) {
  if (!firstCard && !secondCard && !gameTimer) {
    timeHandler();
  }
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched"))
    return;
  card.classList.add("flipped");
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  lockBoard = true;
  moves++;
  document.getElementById("moves").textContent = moves;

  checkCardsForMatch();
}

// -- checking match cards
function checkCardsForMatch() {
  const matchCards = firstCard.dataset.value === secondCard.dataset.value;
  if (matchCards) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matched++;
    document.getElementById("matched").textContent = matched;
    resetTurn();
    if (matched === 8) {
      clearInterval(gameTimer); // stop timer
      gameTimer = null;
      document.querySelector(".win-message").textContent =
        "You win the game! 🎉";
    }
  } else {
    unMatchedCards();
  }
}
//-- disabling match cards

function disableMatchCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
}

//-- back to game unmatched cards
function unMatchedCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetTurn();
  }, 800);
}

//-- reset turn
function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
// -- reset Game
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", () => {
  clearInterval(gameTimer);
  gameTimer = null;
  moves = 0;
  matched = 0;
  timer = 0;
  document.getElementById("moves").textContent = moves;
  document.getElementById("matched").textContent = matched;
  document.getElementById("timer").textContent = timer;
  document.querySelector(".win-message").textContent = "";
  createCards();
});

//-- game timer
function timeHandler() {
  gameTimer = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}
// added reset button functionality
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", resetGame);
function resetGame() {
  // Reset game values
  firstCard = null;
  secondCard = null;
  cards = shuffleCards(cards);
  createCards();
  document.getElementById("timer").textContent = "0";
  document.getElementById("moves").textContent = "0";
  document.getElementById("matched").textContent = "0";
  document.querySelector(".win-message").textContent = "";
}
