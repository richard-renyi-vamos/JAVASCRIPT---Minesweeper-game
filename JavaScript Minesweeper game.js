<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minesweeper</title>
  <style>
    .board {
      display: grid;
      grid-template-columns: repeat(10, 30px);
      gap: 2px;
    }
    .cell {
      width: 30px;
      height: 30px;
      background-color: lightgray;
      border: 1px solid gray;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Minesweeper</h1>
  <div class="board"></div>

  <script>
    const BOARD_SIZE = 10;
    const NUM_MINES = 10;
    let board = [];
    
    function initializeBoard() {
      board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
      placeMines();
      renderBoard();
    }
    
    function placeMines() {
      let minesPlaced = 0;
      while (minesPlaced < NUM_MINES) {
        const x = Math.floor(Math.random() * BOARD_SIZE);
        const y = Math.floor(Math.random() * BOARD_SIZE);
        if (board[x][y] !== 'mine') {
          board[x][y] = 'mine';
          minesPlaced++;
        }
      }
    }
    
    function renderBoard() {
      const boardElement = document.querySelector('.board');
      boardElement.innerHTML = '';
      for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.x = x;
          cell.dataset.y = y;
          cell.addEventListener('click', handleCellClick);
          boardElement.appendChild(cell);
        }
      }
    }
    
    function handleCellClick(event) {
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      const cellValue = board[x][y];
      revealCell(x, y);
      if (cellValue === 'mine') {
        alert('Game over! You clicked on a mine.');
        initializeBoard();
      }
    }
    
    function revealCell(x, y) {
      const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
      if (!cell || cell.textContent !== '') return;
      const cellValue = board[x][y];
      if (cellValue === 'mine') {
        cell.textContent = '💣';
      } else {
        const minesCount = countAdjacentMines(x, y);
        if (minesCount > 0) {
          cell.textContent = minesCount;
        } else {
          cell.textContent = '';
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              const newX = x + dx;
              const newY = y + dy;
              if (isValidCoordinate(newX, newY)) {
                revealCell(newX, newY);
              }
            }
          }
        }
      }
    }
    
    function countAdjacentMines(x, y) {
      let count = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const newX = x + dx;
          const newY = y + dy;
          if (isValidCoordinate(newX, newY) && board[newX][newY] === 'mine') {
            count++;
          }
        }
      }
      return count;
    }
    
    function isValidCoordinate(x, y) {
      return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
    }
    
    initializeBoard();
  </script>
</body>
</html>
