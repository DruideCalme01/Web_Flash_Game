let randomNumber = Math.floor(Math.random() * 101);
let attempts = 0;

function checkGuess() {
    const userGuess = document.getElementById('guessInput').value;
    const feedback = document.getElementById('feedback');
    attempts++;

    if (userGuess < randomNumber) {
        feedback.textContent = 'Trop bas!';
        feedback.style.color = 'red';
    } else if (userGuess > randomNumber) {
        feedback.textContent = 'Trop haut!';
        feedback.style.color = 'red';
    } else {
        feedback.textContent = `Bravo! Vous avez trouvé en ${attempts} essais.`;
        feedback.style.color = 'green';
        document.getElementById('winButton').classList.remove('hidden');
    }
}

function goHome() {
    window.location.href = '../Home.php';  // Assurez-vous que le chemin vers Home.php est correct
}
