function makeASpiral(n) {
    let arr = Array.from({ length: n }, () => new Array(n).fill(0));
    let value = 1;
    let row = 0,
        col = 0,
        direction = "right";
    while (value <= n * n) {
        arr[row][col] = value++;
        if (direction === "right") {
            if (col === n - 1 || arr[row][col + 1] !== 0) {
                direction = "down";
                row++;
            } else {
                col++;
            }
        } else if (direction === "down") {
            if (row === n - 1 || arr[row + 1][col] !== 0) {
                direction = "left";
                col--;
            } else {
                row++;
            }
        } else if (direction === "left") {
            if (col === 0 || arr[row][col - 1] !== 0) {
                direction = "up";
                row--;
            } else {
                col--;
            }
        } else if (direction === "up") {
            if (row === 0 || arr[row - 1][col] !== 0) {
                direction = "right";
                col++;
            } else {
                row--;
            }
        }
    }
    return arr;
}


console.log(makeASpiral(5)); // [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]

console.log(makeASpiral(10));

/*
 [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]*/