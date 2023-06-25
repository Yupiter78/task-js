const student = {
    stack: ['HTML'],
    level: 1,
    *improveLevel () {
        yield this.level = this.stack.push('CSS');
        yield this.level = this.stack.push('JavaScript');
        yield this.level = this.stack.push('React');
        yield this.level = this.stack.push('NodeJS');
    }
}

console.log(student.improveLevel().next());
console.log(student);

const student_2 = {
    personalStack: [],
    commonStack: ['NodeJS', 'React', 'JavaScript', 'CSS', "HTML"],
    level: 0,
    improveLevel() {
        if (this.level < 5) {
            this.level = this.personalStack.push(this.commonStack.pop());
            return this;
        }
        console.log('The student has learned all technologies!')

    }
}

student_2
    .improveLevel()
    .improveLevel();

// for (let i = 0; i < 10; i++) {
//     student_2.improveLevel();
// }

console.log(student_2);