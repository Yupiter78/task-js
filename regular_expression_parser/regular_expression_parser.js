const digit = {
    exec: function (str, pos) {
        const chr = str.charAt(pos);
        if (chr >= "0" && chr <= "9")
            return { res: +chr, end: pos + 1};
    }
};

console.log(digit.exec("5", 0), `{ res: 5, end: 1 }`);
console.log(digit.exec("Q", 0), `void 0`);

function Pattern(exec) {
    this.exec = exec;
}

function txt(text) {
    return new Pattern(function (str, pos) {
        if (str.substr(pos, text.length) === text)
            return { res: text, end: pos + text.length };
    });
}

console.log(txt("abc").exec("abc", 0), `{ res: "abc", end: 3 }`);
console.log(txt("abc").exec("def", 0), `void 0`);

function rgx(regexp) {
    return new Pattern(function (str, pos) {
        const m = regexp.exec(str.slice(pos));
        console.log(`regexp:`, regexp);
        console.log(`m:`, m);
        if (m && m.index === 0)
            return { res: m[0], end: pos + m[0].length };
    });
}

console.log(rgx(/\d+/).exec("123", 0), { res: "123", end: 3 });
console.log(rgx(/\d+/).exec("abc", 0), `void 0`);