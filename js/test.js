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
