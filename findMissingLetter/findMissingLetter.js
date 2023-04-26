function findMissingLetter(arr) {
    let indexStartChar = arr[0].codePointAt(0);
    let index = 0;
     for (let char of arr) {
        if (indexStartChar++ !== arr[index++].codePointAt(0)) {
            return String.fromCodePoint(indexStartChar - 1);
        }
    }
}

console.log(findMissingLetter(["a", "b", "c", "d", "f"]));
console.log(findMissingLetter(["O", "Q", "R", "S"]));