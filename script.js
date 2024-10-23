// Animal image sources (use URLs or local image paths)
const animals = [
    'https://placekitten.com/100/100',  // Cat
    'https://placedog.net/100/100',     // Dog
    'https://placebear.com/100/100',    // Bear
    'https://placekitten.com/g/100/100', // Grey Cat
    'https://placebear.com/g/100/100',   // Grey Bear
    'https://placedog.net/100/100?id=2'  // Another Dog
];

// Double the array and shuffle for the memory game
const shuffledAnimals = shuffleArray([...animals, ...animals]);

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

// Generate the game grid with cards
function createGameBoard() {
    const gameGrid = document.getElementById('game-grid');
    shuffledAnimals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;

        const img = document.createElement('img');
        img.src = animal;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
}

// Shuffle function (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Flip the card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First card clicked
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Second card clicked
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

// Check if cards match
function checkForMatch() {
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset the board for the next round
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Restart the game
document.getElementById('restart-button').addEventListener('click', function () {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    shuffledAnimals = shuffleArray([...animals, ...animals]);
    createGameBoard();
});

// Initialize the game
createGameBoard();
