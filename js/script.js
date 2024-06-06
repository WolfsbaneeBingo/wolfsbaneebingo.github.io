// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let gameWon = false;

let totalSeconds = 0;
let timerInterval;

function setTime() {
    ++totalSeconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('gameTimer').innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    timerInterval = setInterval(setTime, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
	document.getElementById('gameTimer').innerHTML = '00:00';
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

const winMessage = document.getElementById('winMessage');

 function showWinMessage() {
	const winImg = document.createElement('img');
	let winGif = [...winImages];
	shuffle(winGif);
      winImg.src = winGif[0];
      winImg.alt = 'Wolfsbanee';
	  winImg.style.height = '256px';
	  winImg.style.marginBottom = '25px';
	  
  const winMessage = document.getElementById('winMessage');
  winMessage.innerHTML = ''; // Clear any existing content

  const bingoText = document.createElement('div');
  bingoText.textContent = 'BINGO!';
  bingoText.style.marginBottom = '25px'; // Add some space between text and image
  
  const closeText = document.createElement('div');
  closeText.id = 'closeText';
  closeText.textContent = 'X';

  winMessage.appendChild(bingoText); // Append the text to the winMessage element
  winMessage.appendChild(winImg); // Append the image to the winMessage element
  winMessage.appendChild(closeText);
  
      // Apply CSS transition for fade-in effect
    winMessage.style.opacity = '0';
    winMessage.style.transition = 'opacity 0.5s';

    // Trigger reflow and then set opacity to 1 for fade-in effect
    setTimeout(() => {
        winMessage.style.opacity = '1';
    }, 0);
	
	
	document.getElementById('closeText').addEventListener('click', function() {
    // Apply CSS transition for fade-out effect with 0.5 second duration
    winMessage.style.transition = 'opacity 0.5s';
    winMessage.style.opacity = '0';

    // After the fade-out animation completes, hide the winMessage element
    setTimeout(() => {
        winMessage.style.display = 'none';
    }, 500); // Wait for 0.5 seconds (500 milliseconds) before hiding the element
});

  
  winMessage.style.display = 'block';
 }

// Function to handle cell click
function handleCellClick(event) {
  if (!gameWon) {
    event.target.classList.toggle('crossed');
    if (checkForWin()) {
      gameWon = true;
      showWinMessage();
	  stopTimer();
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
  bingoCardElement.innerHTML = '<div id="winMessage"></div>'; // Clear previous card

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
      img.src = freeImg[0];
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
	resetTimer();
	startTimer();
  gameWon = false;
  generateBingoCard();
  winMessage.style.display = 'none';

}

// Add event listener to the new game button
document.getElementById('newGameBtn').addEventListener('click', resetGame);


document.getElementById('themeButton').addEventListener('click', function() {
  document.body.classList.toggle('light-theme');
});

// Generate the card when the script loads
resetGame();