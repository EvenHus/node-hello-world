var square = x => x*x;

console.log(square(8));

var user = {
  name: 'Even',
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);

  }
};

user.sayHiAlt(1,2,3);
user.sayHi(1,2,3);

