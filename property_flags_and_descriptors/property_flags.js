/*let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);*/
// obj - объект, из которого мы получаем информацию
// propertyName - имя свойства
//возвращаемое значение - это объект, так называемый "дескриптор свойства",
// который содержит значение свойства и все его флаги

const user = {
    name: "John"
}

const userDescriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(userDescriptor, null, 2));
/*{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}*/

/*Object.defineProperty(obj, propertyName, descriptor)*/
// obj - объект, из которого мы получаем информацию
// propertyName - имя свойства
// descriptor - применяемый дескриптор

const user_2 = {};
Object.defineProperty(user_2, "name", {
    value: "Pete"
})

console.log(JSON.stringify(Object.getOwnPropertyDescriptor(user_2, "name"), null, 2));


const user_3 = {
    name: "Vasya"
}
Object.defineProperty(user_3, "name", {
    writable: false
})

user_3.name = "Kolya";
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(user_3, "name"), null, 2));

const user_4 = {};
Object.defineProperty(user_4, "name", {
    value: "Georg",
    enumerable: true,
    configurable: true,
});
console.log("user_4:", user_4);
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(user_4, "name"), null, 2));

const user_5 = {
    name: "Vova",
    toString() {
        return this.name;
    }
}

for (let prop in user_5) {
    console.log(prop);
}

Object.defineProperty(user_5, "toString", {
  enumerable: false
})

for (let prop in user_5) {
    console.log(prop);
}

console.log(Object.keys(user_5));

let descriptorMath = Object.getOwnPropertyDescriptor(Math, "PI");
console.log(JSON.stringify(descriptorMath, null, 2));
/*{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}*/