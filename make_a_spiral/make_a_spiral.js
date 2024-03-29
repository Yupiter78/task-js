function makeASpiral(n) {
    const a = new Array(n * n).fill(null),
        dirs = [1, n, -1, -n],
        result = [];
    let dir = 0,
        addr = 0;

    for (let i = 1; i <= n * n; i++) {
        a[addr] = i;

        if (addr === n - 1 || addr === n * n - 1 || a[addr + dirs[dir]] !== null) {
            dir = (dir + 1) % 4;
        }
        addr += dirs[dir];

    }
    
    for (let y = 0; y < n; y++) {
        result.push(a.slice(y * n, y * n + n));
    }
    return result;
}

console.log(makeASpiral(10));

