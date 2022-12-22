let fib = (n) => {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// console.log("fib(n)", fib(77));

function decorator(f) {
  const cache = {};
  return function (x) {
    if (cache[x]) return cache[x];
    let result = f(x);
    cache[x] = result;
    return result;
  }
}
 fib = decorator(fib);
// console.log("fib(77):", fib(77));



