function spiralMatrix(size) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
    }

    let value = 1;
    let startRow = 0;
    let endRow = size - 1;
    let startCol = 0;
    let endCol = size - 1;

    while (value <= size * size) {
        for (let i = startCol; i <= endCol; i++) {
            matrix[startRow][i] = value;
            value++;
        }

        for (let i = startRow + 1; i <= endRow; i++) {
            matrix[i][endCol] = value;
            value++;
        }

        for (let i = endCol - 1; i >= startCol; i--) {
            matrix[endRow][i] = value;
            value++;
        }

        for (let i = endRow - 1; i > startRow; i--) {
            matrix[i][startCol] = value;
            value++;
        }

        startRow++;
        endRow--;
        startCol++;
        endCol--;
    }

    return matrix;
}

const size = 5;
const matrix = spiralMatrix(size);
console.log(matrix);