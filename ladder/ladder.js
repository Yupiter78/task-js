const ladder = (n, m = 10000) => {
    let result = 0;
    if (n === 0 || n === 1 ) return 1;

    for (let i = 1; i <= Math.min(m, n); i++) {
        let floor = i - 1;
        if (floor * (floor + 1) / 2 >= n - i) {
            result += ladder(n - i, floor);
        }
    }

    return result;
}

console.log("result:", ladder(6));