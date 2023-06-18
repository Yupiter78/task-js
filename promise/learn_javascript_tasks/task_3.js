async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f(func) {
    func().then(data => console.log(data));
}

f(wait);