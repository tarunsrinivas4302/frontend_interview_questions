(function (global) {
    if (!global.fetch) {
      global.fetch = function (url, options = {}) {
        return new MyPromise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(options.method || "GET", url, true);
  
          // Set Headers
          if (options.headers) {
            Object.keys(options.headers).forEach((key) => {
              xhr.setRequestHeader(key, options.headers[key]);
            });
          }
  
          // Handle response
          xhr.onload = function () {
            resolve({
              ok: xhr.status >= 200 && xhr.status < 300,
              status: xhr.status,
              statusText: xhr.statusText,
              json: () => MyPromise.resolve(JSON.parse(xhr.responseText)),
              text: () => MyPromise.resolve(xhr.responseText),
              headers: {
                get: (header) => xhr.getResponseHeader(header),
              },
            });
          };
  
          // Handle network errors
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
  
          xhr.ontimeout = function () {
            reject(new TypeError("Network request timeout"));
          };
  
          xhr.send(options.body || null);
        });
      };
    }
  })(typeof window !== "undefined" ? window : global);
  