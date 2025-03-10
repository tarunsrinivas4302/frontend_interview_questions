class MyEventEmitter {
  constructor() {
    // [eventName] : [listener1 ,listener2 , ...]
    this.__event_listeners = {};
  }

  /**
   * 
   * @param {*} eventname 
   * @param {*} listener 
   * @returns 
   * @description :: Checks event name exists or not if not create a key with the default value then attaches the event to the listener
   */
  on(eventname, listener) {
    if (!this.__event_listeners[eventname]) this.__event_listeners[eventname] = [];
    this.__event_listeners[eventname].push(listener);
    return true;
  }

  /**
   * @param {*} eventname , A name to identify the event 
   * @param {*} listener , A function to call when the event emits 
   * @returns Boolean
   * @description This method offs the events attached to particular eventname
   * @explanation :: This Method first Checks Event Exists or not with the given event Name if it exists we will find the index of that eventname in the list of listeners if the index is greater than -1 then we will splice that eventname
   */
  off(eventname, listener) {
    if (!this.__event_listeners[eventname]) return false;
    const index = this.__event_listeners[eventname].indexOf(listener);
    if (index > -1) {
      this.__event_listeners[eventname].splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {*} eventname 
   * @returns Boolean
   * @description :: Emits the events to the list of listeners attached to that given eventname
   */
  emit(eventname) {
    if (!this.__event_listeners[eventname]) return false;
    this.__event_listeners[eventname].forEach((listener) => listener());
    return true;
  }

  /**
   * 
   * @param {*} eventName 
   * @param {*} listener 
   * @description :: Emits the event only once after that the event can't execute their listener function
   */

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper); 
      listener(...args);
    };
    this.on(eventName, wrapper); 
  }
  

  /**
   * @param {*} eventName 
   * @returns Boolean
   * @description :: Removes all listeners attached to the given eventname , if none given all will be removed 
   */
  removeAllListeners(eventName){
    if(!eventName) this.__event_listeners = {};
    else if(this.__event_listeners[eventName]) delete this.__event_listeners[eventName];
    return true;
  }
}

const emitter = new MyEventEmitter();

emitter.on('click', () => console.log('Clicked 1'));
emitter.on('click', () => console.log('Clicked 2'));

emitter.once('signup', () => console.log('User signed up!'));
emitter.once('signup', () => console.log('User signed up again!'));

emitter.on('click', () => console.log('Clicked 3'));
emitter.on('click', () => console.log('Clicked 4'));

console.log('First emit (click):');
emitter.emit('click');

console.log('First emit (signup):');
emitter.emit('signup'); 

console.log('Second emit (signup):');
emitter.emit('signup')