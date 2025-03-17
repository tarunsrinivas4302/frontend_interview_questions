// ES 5 POLYFILLS

const charsArr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "̥l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// *  ForEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback must be a function");
    }
    if (this == null) {
      throw new TypeError("Array is null or undefined");
    }

    let arrlen = this.length;
    for (let i = 0; i < arrlen; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// *  MAP
if (!Array.prototype.map) {
  Array.prototype.map = function (callback) {
    if (this == null) throw new TypeError("Array must be null");
    if (typeof callback !== "function")
      throw new TypeError("callback must be a function");
    let arr = this;
    let len = arr.length;
    let res = new Array(len);
    for (let i = 0; i < len; i++) {
      if (i in arr) {
        res[i] = callback(arr[i], i, arr);
      }
    }
    return res;
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback) {
    if (this == null) throw new TypeError("Array must be null");
    if (typeof callback !== "function")
      throw new TypeError("callback must be a function");
    let arr = this;
    let len = arr.length;
    let res = [];
    for (let i = 0; i < len; i++) {
      if (i in arr && callback(arr[i], i, arr)) {
        res.push(arr[i]);
      }
    }
    return res;
  };
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValue) {
    if (this == null) throw new TypeError("Array must be null");
    if (typeof callback !== "function")
      throw new TypeError("callback must be a function");
    let arr = this;
    let len = arr.length;
    let accumulator = initialValue;
    if (accumulator === undefined) {
      accumulator = arr[0];
      i = 1;
    }
    for (let i = 0; i < len; i++) {
      if (i in arr) accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
  };
}

// ** REDUCERIGHT

if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function (callback, initialValue) {
    if (this == null) throw new TypeError("Array must be null");
    if (typeof callback !== "function")
      throw new TypeError("callback must be a function");
    let arr = this;
    let len = arr.length;
    let accumulator = initialValue;
    if (accumulator === undefined) {
      accumulator = arr[len - 1];
      i = len - 2;
    }
    for (let i = len - 1; i >= 0; i--) {
      if (i in arr) accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function () {
    if (this == null) throw new TypeError("Array must be null");
    if (typeof callback !== "function")
      throw new TypeError("callback must be a function");
    let arr = this;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (i in arr && callback(arr[i], i, arr)) return true;
    }
    return false;
  };
}

if (!Array.prototype.every) {
  Array.prototype.every = function (callback, thisArg) {
    if (this == null) throw new TypeError("Array is null or undefined");
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not a function`);

    for (let i = 0; i < this.length; i++) {
      if (i in this && !callback.call(thisArg, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    if (this == null) throw new TypeError("Array is null or undefined");
    let arr = this;
    let len = arr.length;
    if (len == 0) return -1;
    let start = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);
    for (let i = start; i < len; i++) {
      if (arr[i] === searchElement) return i;
    }
    return -1;
  };
}

if (Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function (
    searchElement,
    fromIndex = this.length - 1
  ) {
    if (this == null) throw new TypeError("Array is null or undefined");
    let arr = this;
    let len = arr.length;
    if (len == 0) return -1;
    let start = Math.min(fromIndex < 0 ? len + fromIndex : fromIndex, len - 1);
    for (let i = start; i >= 0; i--) {
      if (arr[i] === searchElement) return i;
    }
    return -1;
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex = 0) {
    if (this == null) throw new TypeError("Array is null or undefined");
    let arr = this;
    let len = arr.length;
    if (len == 0) return false;

    let start = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);
    for (let i = start; i < len; i++) {
      if (
        arr[i] === searchElement ||
        Number.isNaN(arr[i] || Number.isNaN(searchElement))
      )
        return true;
    }
    return false;
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    if(this === null) throw new TypeError("Array.prototype.flat can't be used on null or undefined")
    let arr = this;
    let len = arr.length;
    let res = [];
    for (let i = 0; i < len; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        res = res.concat(Array.prototype.flat.call(arr[i], depth - 1));
      } else {
        res.push(arr[i]);
      }
    }
    return res;
  };
}

// ** SLICE

if (!Array.prototype.slice) {
  Array.prototype.slice = function (start, end) {
    if (this == null) throw new TypeError("Array is null or undefined");
    let arr = Object(this);
    let len = arr.length >>> 0;
    let k = Number(start) || 0;

    if (k < 0) {
      k = len + k;
      if (k < 0) k = 0;
    }

    let n = Math.min(len - k, end === undefined ? len : Number(end) || len);
    let A = new Array(n);
    let j = 0;
    while (j < n) {
      let P = k + j;
      if (P in arr) A[j] = arr[P];
      j++;
    }
    return A;
  };
}


