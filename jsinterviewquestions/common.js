console.log(a); // undefined
var a = 10; 
// console.log(b); // Refrence Error : Cannot access 'b' before initialization
// let b = 20;


console.log(1 + "1"); // 11 
console.log(1 - "1"); // 0 
console.log(true + false); // 1 
console.log([] + {}); // [object Object]
console.log({} + []);  //  [object Object]
console.log([] == []) // false
console.log({} == []) // false 
console.log(new Map() === new Map()) // false 

// Data Types and Type of coercion

/**
 * * There are two types of Data types 
 * ! Primitive --> (string , number ,boolean ,undefined  , null ,symbol  and bigint) 
 * ! Object  --> (Array , Object , Function  ,Dates and Other User Defined Objects)
 * 
 * There are two types of ways to know the type of a variable 
 * typeof & instanceof 
 * 
 * typeof operator is used when we want to check the type of inbuilt types
 * instanceof operator is used when we want to check the type of the type of user defined objects or Object types 
 */
function normalFun(a,b){
    return a+b;
}

const anonymousFun = function(){

}

const arrowFn = () => {}

const person = {
    fname : "Tarun",
    lname  : "Putchala",
    age : 23
}
console.clear();
console.log(typeof 1) // number
console.log(typeof "string") // string
console.log(typeof undefined) // undefined
console.log(typeof false) // boolean
console.log(typeof null) // object

console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof normalFun) // function
console.log(typeof anonymousFun) // function
console.log(typeof arrowFn) // function
console.log(typeof new Date()) // object
console.log(typeof new RegExp()) // object
console.log(typeof person) // object


// ------------------------- instanceOf -----------------


console.clear();
console.log(1  instanceof 1) // number
console.log(typeof "string") // string
console.log(typeof undefined) // undefined
console.log(typeof false) // boolean
console.log(typeof null) // object

console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof normalFun) // function
console.log(typeof anonymousFun) // function
console.log(typeof arrowFn) // function
console.log(typeof new Date()) // object
console.log(typeof new RegExp()) // object
console.log(typeof person) // object
