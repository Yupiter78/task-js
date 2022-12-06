const obj = {
    get propName() {
        //геттер, срабатывает при чтении obj.propName
    },
    set propName(value) {
        // сеттер, срабатывает при записи obj.propName = value
    }
}


const user_1 = {
    name: "John",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    },
    set fullName(newName) {
        [this.name, this.surname] = newName.split(" ");
    }
}

user_1.fullName = "Alice Cooper";
console.log("user_1: ", user_1);