function renderGameContainer() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = `
    <div class="game-info">
      <div> Timer: <span id="timer">0</span>s</div>
      <div>Move: <span id="moves">0</span></div>
      <div>Matched: <span id="matched">0</span>/8</div>
    </div>
    <div class="card-container"></div>
    <button class="reset-btn">Reset The Game</button>
    <p class="win-message">You win the game</p>
  `;
}
renderGameContainer();

//-- initial game values
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [...letters, ...letters];

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

  cards.forEach((letter) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.letter = letter;
    card.innerHTML = `
      <div class="card-inner">
        <div class="front">?</div>
        <div class="back">${letter}</div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}
createCards();
