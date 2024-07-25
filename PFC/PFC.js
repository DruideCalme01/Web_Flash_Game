document.addEventListener('DOMContentLoaded', () => {
    const choices = ['pierre', 'feuille', 'ciseau'];
    let playerCards = [];
    let computerCards = [];
    let playerDeck = [];
    let computerDeck = [];
    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 5;

    function getRandomChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function initializeDeck() {
        let deck = [];
        for (let i = 0; i < 100; i++) {
            deck.push(choices[i % choices.length]);
        }
        return deck;
    }

    function drawCard(deck) {
        if (deck.length === 0) return null;
        const index = Math.floor(Math.random() * deck.length);
        return deck.splice(index, 1)[0];
    }

    function setupGame() {
        let deck = initializeDeck();
        playerDeck = [...deck];
        computerDeck = [...deck];
        playerCards = [];
        computerCards = [];

        while (playerCards.length < 5 && playerDeck.length > 0) {
            playerCards.push(drawCard(playerDeck));
        }
        while (computerCards.length < 5 && computerDeck.length > 0) {
            computerCards.push(drawCard(computerDeck));
        }
        
        updateCardDisplay();
        updateScore();
    }

    function updateCardDisplay() {
        const playerCardList = document.getElementById('player-cards');
        const computerCardList = document.getElementById('computer-cards');
        
        playerCardList.innerHTML = '';
        computerCardList.innerHTML = '';

        playerCards.forEach((card, index) => {
            const li = document.createElement('li');
            li.textContent = card;
            li.dataset.index = index;
            li.addEventListener('click', () => selectCard(index));
            playerCardList.appendChild(li);
        });

        computerCardList.innerHTML = '<li>???</li>';
    }

    function selectCard(index) {
        if (isGameOver() || playerCards.length === 0) return;

        const playerChoice = playerCards[index];
        const computerChoice = getRandomChoice();

        const result = determineWinner(playerChoice, computerChoice);

        if (result === 'player') {
            playerScore++;
            document.getElementById('result-message').textContent = `Vous avez gagné ce tour ! (${playerChoice} contre ${computerChoice})`;
        } else if (result === 'computer') {
            computerScore++;
            document.getElementById('result-message').textContent = `Vous avez perdu ce tour. (${playerChoice} contre ${computerChoice})`;
        } else {
            document.getElementById('result-message').textContent = `Égalité ! (${playerChoice} contre ${computerChoice})`;
        }

        playerCards.splice(index, 1);
        const newPlayerCard = drawCard(playerDeck);
        if (newPlayerCard) playerCards.push(newPlayerCard);

        computerCards.shift();
        const newComputerCard = drawCard(computerDeck);
        if (newComputerCard) computerCards.push(newComputerCard);

        updateCardDisplay();
        updateScore();

        if (playerScore >= winningScore || computerScore >= winningScore) {
            endGame();
        }
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'draw';
        if (
            (playerChoice === 'pierre' && computerChoice === 'ciseau') ||
            (playerChoice === 'feuille' && computerChoice === 'pierre') ||
            (playerChoice === 'ciseau' && computerChoice === 'feuille')
        ) {
            return 'player';
        }
        return 'computer';
    }

    function updateScore() {
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('computer-score').textContent = computerScore;
    }

    function endGame() {
        const resultMessage = document.getElementById('result-message');
        const winButton = document.getElementById('win-button');
        const loseButton = document.getElementById('lose-button');
        const resetButton = document.getElementById('reset-button');

        if (playerScore >= winningScore) {
            resultMessage.textContent = 'Vous avez gagné !';
            winButton.style.display = 'inline-block';
            winButton.addEventListener('click', () => {
                window.location.href = 'Home.php#section-welcome'; // Redirection avec ancre
            });
        } else {
            resultMessage.textContent = 'Vous avez perdu !';
            loseButton.style.display = 'inline-block';
        }

        resetButton.style.display = 'inline-block';
        disableCardSelection();
    }

    function disableCardSelection() {
        const playerCardsElements = document.querySelectorAll('#player-cards li');
        playerCardsElements.forEach(card => {
            card.classList.add('disabled');
        });
    }

    function isGameOver() {
        return playerScore >= winningScore || computerScore >= winningScore;
    }

    document.getElementById('reset-button').addEventListener('click', () => {
        setupGame();
        document.getElementById('result-message').textContent = '';
        document.getElementById('reset-button').style.display = 'none';
        document.getElementById('win-button').style.display = 'none';
        document.getElementById('lose-button').style.display = 'none';
        const playerCardsElements = document.querySelectorAll('#player-cards li');
        playerCardsElements.forEach(card => {
            card.classList.remove('disabled');
        });
    });

    setupGame();
});
