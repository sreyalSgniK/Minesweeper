var cols = 10;
var rows = 10;

var arr = new Array(cols);
for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
}
var iter = 0;
for(var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
        arr[i][j] = iter;
        iter++;
    }
}

for(var i = 0; i < cols; i++) {
    console.log(arr[i].join(', '));
}


// console.log(arr[1][1]);


function flag(event) {
    var row = getRowFromY(event.offsetY);
    var col = getColFromX(event.offsetX);

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (board.grid[row][col].cellState == "opened") {
        return;
    }

    if (board.grid[row][col].cellState == "flagged") {
        board.grid[row][col].unflag();
        ctx.clearRect(col * cellWidth + margin + lineWidth, row * cellWidth + margin + lineWidth, cellWidth - lineWidth*2, cellWidth - lineWidth*2);
        return;
    }

    board.grid[row][col].flag();

    ctx.fillText("Flag", col * cellWidth + cellWidth/2 + margin, row * cellWidth + cellWidth/2 + margin);
}