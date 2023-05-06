function makeASpiral(n) {
    const matrix = new Array(n).fill().map(() => new Array(n).fill(0)); // создать пустую матрицу n*n

    let rowStart = 0,
        rowEnd = n - 1,
        colStart = 0,
        colEnd = n - 1,
        num = 1,
        val = 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {
        // top row
        for (let i = colStart; i <= colEnd; i++) {
            matrix[rowStart][i] = val;
        }
        rowStart++;
        // right column
        for (let i = rowStart; i <= rowEnd; i++) {
            matrix[i][colEnd] = val;
        }
        colEnd--;

        // bottom row
        for (let i = colEnd; i >= colStart; i--) {
            matrix[rowEnd][i] = val;
        }
        rowEnd--;

        // left column
        for (let i = rowEnd; i >= rowStart; i--) {
            matrix[i][colStart] = val;
        }
        colStart++;

        val = 1 - val; // Переключение между 0 и 1 в каждом проходе по спирали
    }

    return matrix;
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