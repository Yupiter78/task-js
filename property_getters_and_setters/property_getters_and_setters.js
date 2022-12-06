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
console.log("user_1 descriptors: ", JSON.stringify(Object.getOwnPropertyDescriptors(user_1), null, 2));


const user_2 = {
    name: "Anny",
    surname: "Apple"
}
Object.defineProperty(user_2, "fullName", {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(" ");
    },
    enumerable: true,
    configurable: true
})

for (let key in user_2) {
    console.log(`${key}: ${user_2[key]}`);
}

console.log("user_2 descriptors: ", JSON.stringify(Object.getOwnPropertyDescriptors(user_2), null, 4));

const user_3 = {
    get name() {
        return this._name;
    },
    set name(value) {
        if(value.length < 4) {
            console.log(`Имя из ${value.length} символов слишком короткое, должно быть более 4 символов`);
            return;
        }
        this._name = value;
    }
};

user_3.name = "Alice";
console.log("user_3: ", user_3);

user_3.name = "Tom";

