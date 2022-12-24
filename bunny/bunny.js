
function bunny(n, k) {
    const count = [1];
    for (let i = 1; i <= n; i++) {
        console.log(`______________${i}_______________`);
        console.log("i:", i, "k:", k);
        console.log("count:", count);
        console.log(`count.slice(${Math.max(0, i - k)}, ${i}):`, count.slice(Math.max(0, i - k), i));
       const sliceCount = count.slice(Math.max(0, i - k), i);
       const reduceCount = sliceCount.reduce((prev, cur) => {
           console.log("prev:", prev, "cur:", cur);
           return prev + cur
       });
       console.log("reduceCount:", reduceCount);
        count.push(reduceCount);
    }
    console.log("count.length:", count.length);
    return count[n];
}

console.log(bunny(10, 3));
// console.log(bunny(10, 10));
// console.log(bunny(7, 2));
// console.log(bunny(3, 1));


function bunny_2(n) {
    const count = [1];
    for (let i = 1; i <= n; i++) {
        console.log(`______________${i}_______________`);
        console.log("count:", count);
        console.log(`count.slice(0, ${i}):`, count.slice(0, i));
        const sliceCount = count.slice(0, i);
        const reduceCount = sliceCount.reduce((prev, cur) => {
            console.log("prev:", prev, "cur:", cur);
            return prev + cur
        });
        console.log("reduceCount:", reduceCount);
        count.push(reduceCount);
    }
    console.log("count.length:", count.length);
    return count[n];
}

console.log(bunny_2(10));
console.log(bunny_2(7));
console.log(bunny_2(3));
console.log("________________________");
console.log("[...'abcdefg']:", [..."abcdefg"]);
console.log("'abcdefg'.split(''):", "abcdefg".split(""));


