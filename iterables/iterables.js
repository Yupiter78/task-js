const range =  {
    from: 1,
    to: 5,
    [Symbol.iterator] () {
            return {
                current: this.from,
                last: this.to,
                next () {
                    return (this.current <= this.last) ?  {
                            done: false,
                            value: this.current++
                        } : {
                            done: true
                        }
                }
            }
    }
}


for (let num of range) {
    console.log(num);
}

console.log([...range]);
