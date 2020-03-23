// const person = {
//     name : 'Nickie', 
//     age : 26
// }

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`I'm ${this.name} and am ${this.age} year old`)
    }
}

module.exports = Person;
