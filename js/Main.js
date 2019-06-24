const fieldSize = 800;
const numberOfCellsInRow = 50;
const framesPerSecond = 8;


const RandomGrid = () => {
    const grid = new Array(numberOfCellsInRow);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(numberOfCellsInRow);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2)
        }
    }
    return grid
};



const NextGeneration = (grid) => {
    const nextGrid = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(grid.length);
        for (let j = 0; j < nextGrid[i].length; j++) {
            if (grid[i][j] === 0 && sum_Neighbors(grid, i, j) === 3) {
                nextGrid[i][j] = 1
            } else if (
                (grid[i][j] === 1) &&
                (sum_Neighbors(grid, i, j) < 2 || sum_Neighbors(grid, i, j) > 3)
            ) {
                nextGrid[i][j] = 0
            } else {
                nextGrid[i][j] = grid[i][j]
            }
        }
    }
    return nextGrid
};



const sum_Neighbors = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += grid[(x + i + grid.length) % grid.length][(y + j + grid[0].length) % grid[0].length]
        }
    }
    return sum - grid[x][y];
};



const cellStrokeColor = '#aaa';

const cellSize = fieldSize / numberOfCellsInRow;



const drawGrid = (ctx, grid) => {
    ctx.strokeStyle = cellStrokeColor;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j]) {
                ctx.fillRect(
                    i * cellSize,
                    j * cellSize,
                    cellSize,
                    cellSize,
                )
            }
            ctx.strokeRect(
                i * cellSize,
                j * cellSize,
                cellSize,
                cellSize,
            )
        }
    }
};



const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, fieldSize, fieldSize);
    drawGrid(ctx, grid);
    setTimeout(() => {
        requestAnimationFrame(() => generation(ctx, NextGeneration(grid)))
    }, 1000 / framesPerSecond);

};



window.onload = () => {

    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');

    const grid = RandomGrid();

    generation(ctx, grid);

};