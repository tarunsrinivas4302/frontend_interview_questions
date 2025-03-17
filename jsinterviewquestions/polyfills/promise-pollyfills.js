(function (global) {
    if (!global.Promise) {
      class MyPromise {
        constructor(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("Promise resolver must be a function");
          }
  
          this.state = "pending"; // "pending", "fulfilled", "rejected"
          this.value = undefined;
          this.reason = undefined;
          this.thenCallbacks = [];
          this.catchCallbacks = [];
  
          const resolve = (value) => {
            if (this.state === "pending") {
              this.state = "fulfilled";
              this.value = value;
              this.thenCallbacks.forEach((callback) => callback(value));
            }
          };
  
          const reject = (reason) => {
            if (this.state === "pending") {
              this.state = "rejected";
              this.reason = reason;
              this.catchCallbacks.forEach((callback) => callback(reason));
            }
          };
  
          try {
            executor(resolve, reject);
          } catch (error) {
            reject(error);
          }
        }
  
        then(onFulfilled, onRejected) {
          return new MyPromise((resolve, reject) => {
            if (this.state === "fulfilled") {
              try {
                resolve(onFulfilled ? onFulfilled(this.value) : this.value);
              } catch (error) {
                reject(error);
              }
            } else if (this.state === "rejected") {
              try {
                resolve(onRejected ? onRejected(this.reason) : this.reason);
              } catch (error) {
                reject(error);
              }
            } else {
              this.thenCallbacks.push((value) => {
                try {
                  resolve(onFulfilled ? onFulfilled(value) : value);
                } catch (error) {
                  reject(error);
                }
              });
  
              this.catchCallbacks.push((reason) => {
                try {
                  resolve(onRejected ? onRejected(reason) : reason);
                } catch (error) {
                  reject(error);
                }
              });
            }
          });
        }
  
        catch(onRejected) {
          return this.then(null, onRejected);
        }
  
        finally(onFinally) {
          return this.then(
            (value) => {
              onFinally && onFinally();
              return value;
            },
            (reason) => {
              onFinally && onFinally();
              throw reason;
            }
          );
        }
  
        static resolve(value) {
          return new MyPromise((resolve) => resolve(value));
        }
  
        static reject(reason) {
          return new MyPromise((_, reject) => reject(reason));
        }
  
        static all(promises) {
          return new MyPromise((resolve, reject) => {
            let results = [];
            let completed = 0;
  
            promises.forEach((promise, index) => {
              MyPromise.resolve(promise)
                .then((value) => {
                  results[index] = value;
                  completed++;
                  if (completed === promises.length) resolve(results);
                })
                .catch(reject);
            });
          });
        }
  
        static race(promises) {
          return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
              MyPromise.resolve(promise).then(resolve).catch(reject);
            });
          });
        }
  
        static any(promises) {
          return new MyPromise((resolve, reject) => {
            let errors = [];
            let rejectedCount = 0;
  
            promises.forEach((promise, index) => {
              MyPromise.resolve(promise)
                .then(resolve)
                .catch((error) => {
                  errors[index] = error;
                  rejectedCount++;
  
                  if (rejectedCount === promises.length) {
                    reject(new AggregateError(errors, "All promises were rejected"));
                  }
                });
            });
          });
        }
  
        static allSettled(promises) {
          return new MyPromise((resolve) => {
            let results = [];
            let completed = 0;
  
            promises.forEach((promise, index) => {
              MyPromise.resolve(promise)
                .then((value) => {
                  results[index] = { status: "fulfilled", value };
                })
                .catch((reason) => {
                  results[index] = { status: "rejected", reason };
                })
                .finally(() => {
                  completed++;
                  if (completed === promises.length) resolve(results);
                });
            });
          });
        }
      }
  
      global.Promise = MyPromise;
    }
  })(typeof window !== "undefined" ? window : global);
  