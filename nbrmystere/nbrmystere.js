let mysteryNumber = Math.floor(Math.random() * 101);
let attempts = 0;

function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const victoryButton = document.getElementById('victoryButton');
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 0 || guess > 100) {
        message.textContent = "Veuillez entrer un nombre valide entre 0 et 100.";
        message.style.color = "red";
        return;
    }

    attempts++;
    
    if (guess < mysteryNumber) {
        message.textContent = "Trop bas ! Essayez encore.";
        message.style.color = "blue";
    } else if (guess > mysteryNumber) {
        message.textContent = "Trop haut ! Essayez encore.";
        message.style.color = "blue";
    } else {
        message.textContent = `Félicitations ! Vous avez trouvé le nombre mystère en ${attempts} tentatives.`;
        message.style.color = "green";
        victoryButton.classList.remove('hidden');
    }

    guessInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(`Le nombre mystère est: ${mysteryNumber}`);
});
