
function bunny(n, k) {
    const count = [1];
    for (let i = 1; i <= n; i++) {
        count.push(count.slice(Math.max(0, i - k), i).reduce((prev, cur) => prev + cur));
    }
    return count[n];
}

console.log(bunny(10, 3));
console.log(bunny(7, 2));
console.log(bunny(3, 1));


