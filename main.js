import {Board} from './js/Board.js';

var rows = 10; // Number of rows in board
var cols = 15; // Number of columns in board
var cellWidth = 40; // Cell width (== height)
var lineWidth = 1; // lines between cells
var width = cellWidth * cols; // Board width
var height = cellWidth * rows; // Board height
var margin = 5; // Small margin with the canvas boundaries so borders are more consistent

var mines = 20;

const canvas = document.getElementById("minesweeper-canvas");
setupCanvas();

var board = new Board(canvas, cellWidth, lineWidth, margin, rows, cols, mines);
board.generateBoard();
// board.printBoard();
console.log(board.grid);

canvas.addEventListener("click", (event) => {
    open(event)
});

// canvas.addEventListener("dblclick", (event) => { 
//     event.preventDefault();
// })

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    flag(event);
});

function open(event) {
    var row = getRowFromY(event.offsetY);
    var col = getColFromX(event.offsetX);

    if (row >= rows || row < 0) {
        return;
    }

    if (col >= cols || col < 0) {
        return;
    }

    board.grid[row][col].open();    
}

function flag(event) {
    var row = getRowFromY(event.offsetY);
    var col = getColFromX(event.offsetX);

    board.grid[row][col].flag();
}

function getRowFromY(y) {
    return Math.floor((y - margin) / cellWidth);
}

function getColFromX(x) {
    return Math.floor((x - margin) / cellWidth);
}


function setupCanvas() {

    canvas.width = width + margin * 2;
    canvas.height = height + margin * 2;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = lineWidth;

    drawVerticalLines(ctx);
    drawHorizontalLines(ctx);
}

function drawVerticalLines(ctx) {
    for (var i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(cellWidth * i + margin, margin);
        ctx.lineTo(cellWidth * i + margin, height + margin);
        ctx.stroke();
    }
}

function drawHorizontalLines(ctx) {
    for (var i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(margin, cellWidth * i + margin);
        ctx.lineTo(width + margin, cellWidth * i + margin);
        ctx.stroke();
    }
}