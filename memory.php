<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
        .grid {
            display: grid;
            gap: 10px;
        }
        .grid button {
            font-size: 20px;
            width: 50px;
            height: 50px;
            cursor: pointer;
        }
        .menu {
            margin-bottom: 20px;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>

<div class="menu">
    <label for="difficulty">Select Difficulty: </label>
    <select id="difficulty" onchange="setDifficulty()">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
    </select>
</div>

<div id="gameBoard" class="grid"></div>
<a href="Home.php"><button id="victoryButton" class="hidden">You Win !</button></a>


<script>
    const icons = ['😀', '😎', '😇', '🤩', '😂', '😜', '🥳', '😊'];
    let firstSelection = null;
    let firstButton = null;
    let boardSize = { rows: 4, columns: 4 };
    let canClick = true;
    let matchesFound = 0;

    function createBoard(rows, columns) {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';
        board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        let iconSet = [...icons, ...icons].slice(0, (rows * columns) / 2);
        let shuffledIcons = [...iconSet, ...iconSet].sort(() => Math.random() - 0.5);

        shuffledIcons.forEach((icon, index) => {
            const button = document.createElement('button');
            button.textContent = ' ';
            button.onclick = () => onButtonClick(index, icon, button);
            board.appendChild(button);
        });

        matchesFound = 0;
        document.getElementById('victoryButton').classList.add('hidden');
    }

    function onButtonClick(index, icon, button) {
        if (!canClick || button.textContent !== ' ' || button.disabled) return;

        button.textContent = icon;

        if (firstSelection === null) {
            firstSelection = index;
            firstButton = button;
        } else {
            canClick = false;
            if (firstButton.textContent === button.textContent) {
                alert('You found a match!');
                firstButton.disabled = true;
                button.disabled = true;
                matchesFound++;
                if (matchesFound === (boardSize.rows * boardSize.columns) / 2) {
                    document.getElementById('victoryButton').classList.remove('hidden');
                }
                resetSelections();
            } else {
                setTimeout(() => {
                    alert('Not a match! Try again.');
                    firstButton.textContent = ' ';
                    button.textContent = ' ';
                    resetSelections();
                }, 1000);
            }
        }
    }

    function resetSelections() {
        firstSelection = null;
        firstButton = null;
        canClick = true;
    }

    function setDifficulty() {
        const difficulty = document.getElementById('difficulty').value;
        if (difficulty === 'Easy') {
            boardSize = { rows: 4, columns: 4 };
        } else if (difficulty === 'Medium') {
            boardSize = { rows: 4, columns: 6 };
        } else if (difficulty === 'Hard') {
            boardSize = { rows: 6, columns: 6 };
        }
        createBoard(boardSize.rows, boardSize.columns);
    }

    function resetGame() {
        createBoard(boardSize.rows, boardSize.columns);
    }

    document.addEventListener('DOMContentLoaded', () => {
        createBoard(boardSize.rows, boardSize.columns);
    });
</script>

</body>
</html>
