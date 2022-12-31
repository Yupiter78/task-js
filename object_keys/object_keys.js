// Похожа на Object .assign (), но не переопределяет существующие
// свойства (и также не обрабатывает свойства Symbol).
function merge(target, ...sources) {
    for (let source of sources) {
        for (let key of Object.keys(source)) {
            if (!(key in target)) { // Это отличается от Object .assign ()
                target[key] = source[key];
                return target;
            }
        }
    }
}
console.log(Object.assign ({x : 1}, {x: 2, y: 2}, {y: 3, z: 4})); // => {x: 2, y: 3, z: 4}
console.log(merge({x: 1}, {x: 2, y: 2}, {y: 3, z: 4})); // => {x: 1, y: 2, z: 4}