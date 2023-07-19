const decToRoman = [
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
];

function calculator(strExp) {
    if (strExp.split(" ").length !== 3) throw new Error("Не допустимое выражение");
    let [a, op, b] = strExp.split(" "),
        isRom = true,
        result = null;
    const actions = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => ~~(a / b),
        }

    if (!actions[op]) throw new Error("Не допустимая математическая операция");

    if (!validateMethod.isTypesNumEqual(a, b)) throw new Error("Введены не допустимые данные.");

    if (validateMethod.isDecNum(a) && validateMethod.isDecNum(b)) {
        a = Number(a);
        b = Number(b);
        isRom = false;
    } else {
        a = convertToDec(a);
        b = convertToDec(b);
    }

    if (!validateMethod.isRange(a, b)) throw new Error(" Введенные данные за пределами допустимого диапазона");

    result = actions[op](a, b);
    return isRom ? convertToRoman(result) : result;
}

const validateMethod = {
    isDecNum: function (numStr) {
        return !Number.isNaN(Number(numStr)) && numStr === Number(numStr).toString() ? Number(numStr) : false;
    },
    isRomNum: function (numStr) {
        return convertToDec(numStr);
    },

    isRange: (a, b) => (a > 0 && a <= 10) && (b > 0 && b <= 10),

    isTypesNumEqual: function (a, b) {
        if (typeof this.isDecNum(a) === "number" && typeof this.isDecNum(b) === "number") return true;
        return typeof this.isRomNum(a) === "number" && typeof this.isRomNum(b) === "number";
    }
}

function convertToRoman(num) {
    if (num <= 0) return '';
    let roman = '';
    while (num > 0) {
        for (const [decNum, romNum] of decToRoman) {
            while (num >= decNum) {
                roman += romNum;
                num -= decNum;
            }
        }
    }
    return roman;
}

function convertToDec(numStr) {
    let dec = 0;
    while (numStr.length > 0) {
        for (const [decNum, romNum] of decToRoman) {
            while (numStr.startsWith(romNum)) {
                dec += decNum;
                numStr = numStr.slice(romNum.length);
            }
        }
        if (dec === 0) return false
    }
    return dec;
}

// console.log(convertToDec("CCCXCIX"));
console.log(`convertToDec("IXX"):`, convertToDec("CCCCC"));

console.log(calculator("X * VII"));