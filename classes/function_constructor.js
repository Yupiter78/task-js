const Person = function ( name, age ) {

    const defaultName = "John";

    this.name = name || defaultName
    this.age = age || 25

    function showName ( name ) {
        console.log ( `My name is ${ name }` );
    }

    this.changeName = function ( newName ) {
        this.name = newName;
        showName ( this.name );
    }
}

const person1 = new Person( null, 18 );
console.log("person1:", person1);
person1.changeName('Mike');


class PersonClass {
    #defaultName = 'John';
    constructor(name = this.#defaultName, age = 25) {
        this.name = name;
        this.age = age;
    }

    #showName( name ) {
        console.log ( `My name is ${ name }` );
    }

    changeName( newName ) {
        this.name = newName;
        this.#showName( this.name );
    }
}


const person2 = new PersonClass( null, 18 );
console.log("person1:", person2);
person2.changeName('Mike');