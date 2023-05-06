function makeASpiral(n) {
    let matrix = []; // create an empty matrix array
    // populate the matrix with zeros
    for (let i = 0; i < n; i++) {
        matrix.push(new Array(n).fill(0));
    }
    // write the spiral pattern onto the matrix
    let count = 1, row = 0, col = 0;
    while (count <= n * n) {
        // move right
        while (col < n && matrix[row][col] === 0) {
            matrix[row][col] = count++;
            col++;
        }
        col--;
        row++;
        // move down
        while (row < n && matrix[row][col] === 0) {
            matrix[row][col] = count++;
            row++;
        }
        row--;
        col--;
        // move left
        while (col >= 0 && matrix[row][col] === 0) {
            matrix[row][col] = count++;
            col--;
        }
        col++;
        row--;
        // move up
        while (row >= 0 && matrix[row][col] === 0) {
            matrix[row][col] = count++;
            row--;
        }
        row++;
        col++;
    }
    return matrix; // return the completed matrix
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