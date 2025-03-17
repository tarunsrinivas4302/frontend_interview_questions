// Practice Questions For Function Currying and Composition

/**
 * What is Function Currying In Js ?
 * A ) Function Currying in JavaScript transforms a function that takes functions as an argument into a series of a function that takes one argument at a time
 * 
 * 2) What is Function Composition in JavaScript ?
 * A ) Function Composition is process of combining multiple functions into a single function to produce a new function instead of writing a complex logic in a one monolithic function
 * 
 * 3) How does Function Composition helps in writing cleaner code ?
 * A) function composition makes code in to a smalller functions so that they can be easily reusable and readable and maintainable so that codes are easily understandable and easy to debug 
 * 
 * 4) difference between function composition and currying  


*/

// Example Of Function Currying
function multiply(a) {
  // return a * b * c;
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}
console.log("Currying Function Example");
console.log(multiply(2)(3)(4)); // Output: 24

// Example of Function Composing
const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;

const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fns) => fns(acc), value);

const composedFn = compose(add5, multiplyBy2);
console.log("Compose Function Example");
console.log(composedFn(10)); // 25

// Difference Between Compose and pipe functions

// Compose function is right-to-left composition. It takes multiple functions and composes them into a single function.
// Pipe function is left-to-right composition. It takes multiple functions and composes them into a single function.

// Example of pipe function

const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((acc, fn) => fn(acc), val);
console.log("PIPE FUNCTION EXAMPLE");
const pipeEx = pipe(add5, multiplyBy2);
console.log(pipeEx(2));
