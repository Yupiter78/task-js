//let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
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