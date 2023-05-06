function makeASpiral(n) {
    const matrix = Array.from({length: n}, () => new Array(n).fill(0));

    let rowStart = 0,
        rowEnd = n - 1,
        colStart = 0,
        colEnd = n - 1,
        count = 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {

        // top row
        for (let i = colStart; i <= colEnd; i++) {
                matrix[rowStart][i] = 1;
                count++;
        }
        rowStart = rowStart + 1;

        if (colStart !== 0) colStart += 1;
        // right column
        for (let i = rowStart; i <= rowEnd; i++) {

                matrix[i][colEnd] = 1;
                count++;
        }
        colEnd = colEnd - 1;
        if (rowStart === rowEnd) break;

        // bottom row
        for (let i = colEnd; i >= colStart; i--) {
                matrix[rowEnd][i] = 1;
                count++;
        }
        rowEnd = rowEnd - 1;
        if (colStart === colEnd) break;

        // left column
        for (let i = rowEnd; i > rowStart; i--) {
                matrix[i][colStart] = 1;
        }

        rowStart++;
        rowEnd--;
        colStart++;
        colEnd--;
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