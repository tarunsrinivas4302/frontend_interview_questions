// Function.call Polyfill

// Function.call is

if (!Function.prototype.call) {
  Function.prototype.call = function (context, ...args) {
    if (typeof this !== "function") {
      throw new TypeError(this + " is not a function");
    }

    // If Context is null or undefined , default to global Object (Window in Browser or global in Nodejs)
    context = context || globalThis;

    // Create a unique property to avoid overwriting existing ones
    const fnSymbol = Symbol("fn");

    context[fnSymbol] = this; // Assign the function to context Object

    const result = context[fnSymbol](...args); // Calling the Function

    // Delete the property
    delete context[fnSymbol];
    return result;
  };
}

const person = {
  fullName: function (age) {
    return this.firstName + " " + this.lastName + " and he/she is " + age;
  },
};
const person1 = {
  firstName: "John",
  lastName: "Doe",
};
const person2 = {
  firstName: "Mary",
  lastName: "Doe",
};

console.log("Call Function ")
console.log("=======================")
console.log(person.fullName.call(person2, 20));
console.log("=======================")



// Function apply

if(!Function.prototype.apply){
  Function.prototype.apply = function(context  , argsArr){
    if(typeof this!== 'function'){
      throw new TypeError(this +'is not a function');
    }
    context = context || globalThis;
    if(argsArr !== undefined && !Array.isArray(argsArr)){
      throw new TypeError("Second argument must be an array")
    }
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;
    const result = argsArr ? context[fnSymbol](...argsArr) : context[fnSymbol]();
    delete context[fnSymbol];
    return result;
  }
}

function introduce(language, country) {
  return `Hi, I'm ${this.firstName}. I speak ${language} and I'm from ${country}.`;
}

console.log("Apply Example Start")
console.log("=======================")
console.log(introduce.apply(person2, ["English", "USA"])); 
console.log("=======================")

// Function bind

if(!Function.prototype.bind){
  Function.prototype.bind = function(context , ...args){
    if(typeof this !== "function"){
      throw new TypeError("Function.prototype.bind must be a function");
    }
    let func = this;

    return function(...args1){
      return func.apply(context , [...args , ...args1])
    }
  }
}

let introduceFn = introduce.bind(person1 , "English");
console.log("Bind Function Starts")
console.log("==========================")
console.log(introduceFn("USA"));
console.log("==========================")



