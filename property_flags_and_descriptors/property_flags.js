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

Math.PI = 3;
console.log("Math.PI: ", Math.PI); // 3.141592653589793

const user_6 = {};
Object.defineProperty(user_6, "name", {
    value: "Yuriy"
});

console.log("user_6:", user_6);
const descriptorObj = Object.getOwnPropertyDescriptor(user_6, "name");
console.log(JSON.stringify(descriptorObj, null, 2));

user_6.name = "New Name";
console.log("user_6:", user_6);

delete user_6.name;
console.log("user_6:", user_6);

/*Object.defineProperty(user_6, "name", {
    value: "Next name",
    writable: true,
    enumerable: true,
    configurable: true
});*/ // TypeError: Cannot redefine property: name

const descriptorObjNext = Object.getOwnPropertyDescriptor(user_6, "name");
console.log(JSON.stringify(descriptorObjNext, null, 2));

/*Object.defineProperties(obj, {
    prop1: descriptor1,
    prop2: descriptor2
});*/
const user_7 = {};
Object.defineProperties(user_7, {
    name: {value: "Alex", writable: false, enumerable: true, configurable: true},
    surname: {value: "Family", writable: true, enumerable: true, configurable: true}
});

console.log("user_7: ", user_7);
console.log("user_7: ", Object.getOwnPropertyDescriptors(user_7));

const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user_7));
// клонирование объекта вместе с его флагами

console.log("clone: ", Object.getOwnPropertyDescriptors(clone));
console.log("user_7 === clone: ", user_7 === clone);

const clone_2 = {};
for (let key in user_7) {
    clone_2[key] = user_7[key];
}
console.log("clone_2: ", Object.getOwnPropertyDescriptors(clone_2));
// клонирование через цикл for in не копирует флаги свойств и
// игнорирует символьные и неперечислимые свойства.
// Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств

const user_8 = {
    name: "Victor"
}

Object.preventExtensions(user_8); // запрещает добавлять новые свойства в объект
console.log("user_8: ", Object.getOwnPropertyDescriptors(user_8));
user_8.surname = "Family";
console.log("user_8: ", Object.getOwnPropertyDescriptors(user_8));

const user_9 = {
    name: "Alice"
}

Object.seal(user_9); // запрещает добавлять/удалять свойства.
// Устанавливает configurable: false для всех существющих свойств.
console.log("user_9: ", Object.getOwnPropertyDescriptors(user_9));

const user_10 = {
    name: "Tom",
    surname: "Jerry"
}

Object.freeze(user_10); // запрещает добавлять/удалять/изменять свойства.
// Устанавливает configurable: false, writable: false для всех имеющихся свойствю
console.log("user_10: ", Object.getOwnPropertyDescriptors(user_10));

const user_11 = {
    name: "Tom",
    surname: "Jerry"
}

console.log("user_8 isExtensible; ", Object.isExtensible(user_8));
console.log("user_9 isExtensible; ", Object.isExtensible(user_9));
console.log("user_10 isExtensible; ", Object.isExtensible(user_10));
console.log("user_11 isExtensible; ", Object.isExtensible(user_11));

console.log("user_8 isSealed; ", Object.isSealed(user_8));
console.log("user_9 isSealed; ", Object.isSealed(user_9));
console.log("user_10 isSealed; ", Object.isSealed(user_10));
console.log("user_11 isSealed; ", Object.isSealed(user_11));

console.log("user_8 isFrozen; ", Object.isFrozen(user_8));
console.log("user_9 isFrozen; ", Object.isFrozen(user_9));
console.log("user_10 isFrozen; ", Object.isFrozen(user_10));
console.log("user_11 isFrozen; ", Object.isFrozen(user_11));

