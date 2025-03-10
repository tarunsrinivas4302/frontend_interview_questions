/**
 * What is Debouncing and Throttling
 *
 * Debouncing and Throttling are the techniques of Functional Programming to Optimise the Performance of the Code
 *
 * Debounce Function limits the execution of a function call and waits for a certain amount of time before running it again
 *
 * Throttling is a technique , to limit the execution of an event handler function call , event when this event trigger continosly , due to user actions ex : browser resizing
 *
 *
 */

/**
 *
 * @param {*} fn , A Function which we want to execute after a time period
 * @param {*} delay , A delay in milliseconds ex : 1000 -> 1s
 * @returns A closure Function which will be executed after a given time period
 */

function debounce(fn, delay) {
  let timer; // Initalizing the timer outside the return function to create the closure . because it is accessible even after the references of the variables of outer function is executed
  return function () {
    const context = this; // Copying the context of the inner function outside the timer
    clearTimeout(timer); // Clearing the timer before calling setTimeout (This helps in restricting multiple timer instances)
    setTimeout(() => {
      fn.apply(context, arguments); // Calling a function inside setTimeout with the delay . as its an async fn
    }, delay);
  };
}   

function throttling(fun, interval) {
  let trigger = true;
  return function () {
    if (trigger) {
      fun();
      trigger = false;
      setTimeout(() => {
        trigger = true;
      }, interval);
    }
  };
}
