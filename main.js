import {Board} from '/js/Board.js';

var rows = 10; // Number of rows in board
var cols = 15; // Number of columns in board
var cellWidth = 40; // Cell width (== height)
var width = cellWidth * cols; // Board width
var height = cellWidth * rows; // Board height
var margin = 5; // Small margin with the canvas boundaries so borders are more consistent


var canvas = document.getElementById("minesweeper-canvas");

setupCanvas();
var board = new Board();






// // Test text
// ctx.font = "15px Arial";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// // text position: cellWidth * cell pos / 2 + margin
// ctx.fillText("0", cellWidth/2 + margin, cellWidth/2 + margin);



function setupCanvas() {

    canvas.width = width + margin * 2;
    canvas.height = height + margin * 2;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

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