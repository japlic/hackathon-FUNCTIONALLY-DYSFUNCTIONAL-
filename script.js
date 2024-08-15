const gridSize = 8;
const mineCount = 10;
let revealedCells = 0;
let mines = [];
let flags = [];

function createGrid() {
    const grid = document.getElementById('minesweeper-grid');
    grid.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => revealCell(cell, i));
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleFlag(cell);
        });
        grid.appendChild(cell);
    }
    placeMines();
}

function placeMines() {
    let count = 0;
    while (count < mineCount) {
        const index = Math.floor(Math.random() * gridSize * gridSize);
        if (!mines.includes(index)) {
            mines.push(index);
            count++;
        }
    }
}

function revealCell(cell, index) {
    if (cell.classList.contains('revealed') || cell.classList.contains('flagged')) return;

    if (mines.includes(index)) {
        cell.classList.add('mine');
        document.getElementById('message').textContent = 'Game Over!';
        revealAllMines();
    } else {
        cell.classList.add('revealed');
        revealedCells++;
        if (revealedCells >= gridSize * gridSize - mineCount) {
            document.getElementById('message').textContent = 'You Win!';
        }
    }
}

function toggleFlag(cell) {
    if (cell.classList.contains('revealed')) return;

    if (cell.classList.contains('flagged')) {
        cell.classList.remove('flagged');
    } else {
        cell.classList.add('flagged');
    }
}

function revealAllMines() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        if (mines.includes(index)) {
            cell.classList.add('mine');
        }
    });
}

createGrid();
