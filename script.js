document.addEventListener("DOMContentLoaded", function () {
    // Initialize game variables
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    let gameArray = [];
    let flippedCards = [];
    let matchedPairs = 0;

    // Double the colors array and shuffle it
    gameArray = colors.concat(colors);
    gameArray.sort(() => 0.5 - Math.random());

    // Create the game board
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < gameArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = gameArray[i];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    }

    // Handle card flip
    function handleCardClick(event) {
        const clickedCard = event.target;

        // Check if already flipped or matched
        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        // Limit to two flipped cards
        if (flippedCards.length >= 2) {
            return;
        }

        // Flip the card
        clickedCard.style.backgroundColor = clickedCard.dataset.color;
        clickedCard.classList.add('flipped');

        // Add the card to flipped cards array
        flippedCards.push(clickedCard);

        // Check for a match
        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.color === flippedCards[1].dataset.color) {
                // Match found
                flippedCards.forEach(card => card.classList.add('matched'));
                matchedPairs++;
            } else {
                // Not a match, flip cards back
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.style.backgroundColor = '';
                        card.classList.remove('flipped');
                    });
                    flippedCards = [];
                }, 1000);
                return;
            }

            // Clear flipped cards array
            flippedCards = [];

            // Check for game win
            if (matchedPairs === colors.length) {
                setTimeout(() => alert('You won!'), 500);
            }
        }
    }
});
