try {
    function calculator(strExp) {
        if (strExp.split(" ").length !== 3) throw new Error("Не допустимое выражение");
        const [a, op, b] = strExp.split(" "),
            romDigit = {
                I: 1,
                II: 2,
                III: 3,
                IV: 4,
                V: 5,
                VI: 6,
                VII: 7,
                VIII: 8,
                IX: 9,
                X: 10
            },
            actions = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => ~~(a / b),
            }


            if (!actions[op]) throw new Error("Не допустимая математическая операция");
            if (romDigit[a] && romDigit[b]) {
                return digitPars(actions[op](romDigit[a], romDigit[b]));
            }
            if (!parseInt(a) || !parseInt(b)) throw new Error("Не однотипные операнды");
            if (!(a > 0 && a <= 10) || !(b > 0 && b <= 10)) throw new Error("Введенные данные за пределами допустимого диапазона");
        return actions[op](+a, +b).toString();
    }

    function digitPars(num) {
        if (num <= 0) return "";
        const numStr = num.toString(),
            len = numStr.length,
            digitArr = Array.from(numStr, (item, i) => ( +item * 10 ** (len - (1 + i)) ).toString()),
            romNum = {
                1: "I",
                4: "IV",
                5: "V",
                9: "IX",
                10: "X",
                40: "XL",
                50: "L",
                90: "XC",
                100: "C",
            }

        return digitArr.reduce((prev, cur)=> {
            if (romNum[cur]) return prev + romNum[cur];
            const len = cur.length,
                rate = 10 ** (len - 1),
                quantity = +cur / rate;
            if (quantity > 5) {
                return prev + romNum[5 * rate] + romNum[rate].repeat(quantity - 5);
            }
            return prev + romNum[rate].repeat(quantity);
        }, "");
    }
} catch (error) {
    console.log(error.message);
}

// console.log(digitPars(500));
// console.log(digitPars(64));

console.log("отрицательное значение", calculator("IX - X"));
console.log(calculator("9 + 5"));
console.log(calculator("9 % 5"));


