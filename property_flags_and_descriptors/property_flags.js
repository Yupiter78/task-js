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
