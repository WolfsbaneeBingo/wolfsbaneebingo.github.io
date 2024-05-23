/* // Array of words to use on the bingo card
const bingoWords = ["where are you from?","where are you?","are you singaporean?","are you [wrong nationality]?","is this [wrong country]?","is this singapore?","are you drunk?","are you high?","sussy first time chatter","is that a brompton?","is that an e-bike?","oolong Prayge blerp","rainer media share pls","peeguu says he's gay","peegu calls streamer gay","streamer gets lost","streamer says something sussy","can i come lols... (serious)","streamer gets distracted by booba","chat gets distracted by booba","streamer drinks coffee","streamer eats meal","streamer eats snack","stream LSD","stream disconnects","streamer toilet break","streamer mutes audio","gintings adds a new emote","streamer buys something cute","streamer buys something funny","gacha","streamer speaks mandarin","streamer flexes muscles","streamer talks about gym","streamer says samsung s24 ultra","streamer sees tom and jerry","streamer sees gundam","streamer says she's not drinking alcohol","streamer drinks alcohol"]; */

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Timer variables
let timerInterval;
let secondsElapsed = 0;
let gameWon = false;

function startTimer() {
  clearInterval(timerInterval); // Clear any existing intervals
  secondsElapsed = 0;
  timerInterval = setInterval(() => {
    if (!gameWon) {
      secondsElapsed++;
      let hours = Math.floor(secondsElapsed / 3600);
      let minutes = Math.floor((secondsElapsed % 3600) / 60);
      let seconds = secondsElapsed % 60;

      // Format time as H:MM:SS if hours > 0, otherwise MM:SS
      let timeString = '';
      if (hours > 0) {
        timeString += `${hours}:`;
      }
      timeString += `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      document.getElementById('time').textContent = timeString;
    }
  }, 1000);
}


// Function to check for a win
function checkForWin() {
  const rows = Array.from({ length: 5 }, (_, i) =>
    Array.from(document.querySelectorAll(`.row-${i}`))
  );
  const cols = Array.from({ length: 5 }, (_, i) =>
    Array.from(document.querySelectorAll(`.col-${i}`))
  );

  const mainDiagonal = Array.from({ length: 5 }, (_, i) =>
    document.querySelector(`.row-${i}.col-${i}`)
  );
  const secondaryDiagonal = Array.from({ length: 5 }, (_, i) =>
    document.querySelector(`.row-${i}.col-${4 - i}`)
  );

  const lines = [...rows, ...cols, mainDiagonal, secondaryDiagonal];
  return lines.some(line => line.every(cell => cell.classList.contains('crossed')));
}


// Function to handle cell click
function handleCellClick(event) {
  if (!gameWon) {
    event.target.classList.toggle('crossed');
    if (checkForWin()) {
      gameWon = true;
      document.getElementById('winMessage').style.display = 'block';
      clearInterval(timerInterval); // Stop the timer
    }
  }
}

// Function to generate the bingo card
function generateBingoCard() {
  const cardSize = 25; // 5x5 Bingo card
  let cardWords = [...bingoWords];
  shuffle(cardWords);
  cardWords = cardWords.slice(0, cardSize); // Get only the number of words we need
  cardWords[12] = ""; // Center space is a free space

  const bingoCardElement = document.getElementById('bingoCard');
  bingoCardElement.innerHTML = ''; // Clear previous card

  // Create bingo cells
  cardWords.forEach((word, index) => {
    const cell = document.createElement('div');
    cell.textContent = word;
    cell.classList.add('bingo-cell', `row-${Math.floor(index / 5)}`, `col-${index % 5}`);
    cell.addEventListener('click', handleCellClick);
    bingoCardElement.appendChild(cell);
	
	if (index === 12) {
    const img = document.createElement('img');
	let freeImg = [...bingoImages];
	shuffle(freeImg);
      img.src = freeImg[0]; // Replace with your image path
      img.alt = 'Wolfsbanee';
	  img.style.width = '100%';
		img.style.height = '100%';
		img.style.opacity = '0.7';
      cell.appendChild(img);
      cell.classList.add('crossed');
    } else {
      cell.textContent = word;
    }
  });
}

// Function to reset the game
function resetGame() {
	gameWon = false;
  document.getElementById('winMessage').style.display = 'none';
  document.getElementById('time').textContent = "00:00";
  generateBingoCard();
  startTimer();
}

// Add event listener to the new game button
document.getElementById('newGameBtn').addEventListener('click', resetGame);

document.getElementById('themeButton').addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
});

// Generate the card when the script loads
resetGame(); // This will also start the timer