/*const spiralize = (size) => {
    const getIndex = (idx, size) => (idx < size / 2) ? idx : size - 1 - idx;
    const result = Array.from({length: size}, () => new Array(size).fill(0));
        result.map( (row, rowIdx) => {
            row.map((col, colIdx) => {
                console.log('rowIdx <= size / 2 - 1 + Math.sign(size % 4) && rowIdx - colIdx === 1 //',
                     `${rowIdx} <= ${size} / 2 - 1 + ${Math.sign(size % 4)} && ${rowIdx} - ${colIdx} === 1 //`,
                    rowIdx <= size / 2 - 1 + Math.sign(size % 4) && rowIdx - colIdx === 1);

                console.log(`size / 2 - 1 + Math.sign(${size % 4})`, size / 2 - 1 + Math.sign(size % 4));
                const shouldReverse = rowIdx <= size / 2 - 1 + Math.sign(size % 4) &&
                    rowIdx - colIdx === 1;
                const rowIdxMirror = getIndex(rowIdx, size),
                    colIdxMirror = getIndex(colIdx, size);
                return rowIdxMirror % 2 && rowIdxMirror <= colIdxMirror ||
                colIdxMirror % 2 && rowIdxMirror >= colIdxMirror ?
                    Number(shouldReverse) : Number(!shouldReverse);

            })
        });
    return result;
}*/

const spiralize = (size) => {
    const getIndex = idx => (idx < size / 2) ? idx : size - 1 - idx,
        isBorder = size / 2 - 1 + Math.min(size % 4, 1);

    return Array.from({ length: size }, () => [...Array(size)].fill(0))
        .map((row, rowIdx) =>
            row.map((col, colIdx) => {
                const shouldReverse = rowIdx <= isBorder && rowIdx - colIdx === 1;
                const rowIdxMirror = getIndex(rowIdx),
                    colIdxMirror = getIndex(colIdx);
                return rowIdxMirror % 2 && rowIdxMirror <= colIdxMirror ||
                colIdxMirror % 2 && rowIdxMirror >= colIdxMirror ?
                    Number(shouldReverse) : Number(!shouldReverse);
            })
        );
};




console.log(spiralize(5)); // [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]

//console.log(spiralize(10));