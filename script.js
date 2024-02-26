document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultContainer = document.getElementById('result-container');
    const resultDiv = document.getElementById('result');
    const newGameBtn = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create cells in the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                displayResult(`${currentPlayer} wins!`);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            displayResult("It's a draw!");
        }
    }

    function displayResult(message) {
        resultDiv.textContent = message;
        resultContainer.style.display = 'block';
    }

    newGameBtn.addEventListener('click', resetGame);

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        resultContainer.style.display = 'none';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }
});
