/**
 * Implementing Deep Cloning (Handling Cyclic References ...)
 * 
 * Deep Cloning creates an exact independent copy of an object, including nested structures . the challenge is handling cyclic references (when an object references itself)
 */


function deepClone(obj, hash = new WeakMap()) {

     // Handling primitives
    if (obj === null || typeof obj !== "object") return obj;
    
    // Handle cyclic references
    if (hash.has(obj)) return hash.get(obj);   
    
    let clone;
  
    if (Array.isArray(obj)) {
      clone = [];
      hash.set(obj, clone);
      obj.forEach((item, index) => (clone[index] = deepClone(item, hash)));
    } else if (obj instanceof Date) {
      clone = new Date(obj);
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map();
      hash.set(obj, clone);
      obj.forEach((value, key) => clone.set(key, deepClone(value, hash)));
    } else if (obj instanceof Set) {
      clone = new Set();
      hash.set(obj, clone);
      obj.forEach((value) => clone.add(deepClone(value, hash)));
    } else {
      clone = Object.create(Object.getPrototypeOf(obj)); // Preserve prototype
      hash.set(obj, clone);
      Object.keys(obj).forEach((key) => (clone[key] = deepClone(obj[key], hash)));
    }
  
    return clone;
  }

  
  const person = {
    name: "Alice",
    age: 30,
    friends: ["Bob", "Charlie"],
    address: { city: "New York", zip: 10001 },
  };
  
  // Introduce a cyclic reference
  person.self = person;
  
  // Deep Clone the Object
  const clonedPerson = deepClone(person);
  
  // Modify cloned object
  clonedPerson.name = "Bob";
  clonedPerson.address.city = "Los Angeles";
  clonedPerson.friends.push("David");
  
  console.log("Original:", person);
  console.log("Cloned:", clonedPerson);
  console.log("Cyclic Reference Check:", clonedPerson.self === clonedPerson); 
  
const original = {
    name: "Alice",
    age: 30,
    date: new Date(),
    regex: /test/gi,
    address: { city: "New York", zip: 10001 },
    hobbies: ["reading", "traveling"],
    map: new Map([["key1", "value1"]]),
    set: new Set([1, 2, 3]),
  };
  
  const cloned = deepClone(original);
  
  cloned.name = "Bob";
  cloned.address.city = "Los Angeles";
  cloned.hobbies.push("gaming");
  

  