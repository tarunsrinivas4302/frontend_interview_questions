### Functional Programming Concepts in JavaScript.

🔷 Function Composition

Function Composition is the Process of combining multiple functions to produce a new function instead of writing a complex functions with many steps , we can break them down into smaller , reusable functions and then compose them together

### Q) Why is Function Composition Important ?

1. ✅ Code Reusablity - Small Functions can be reused in different contexts
2. ✅ Readablity - Instead of writing a large function , compose smaller functions to improve clarity
3. ✅ Debugging - Easier to Test and Debug small functions than large monolithic functions

# 🛠 Function Composition in Action

Let’s take an example: Suppose we want to process a user’s name and format it nicely.

### Step 1 : Writing a Small Utility functions

```javascript
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
```

Each function does one specific thing:

1. [trim()] removes unnecessary spaces.
2. [toLowerCase()] ensures uniform lowercase text.
3. [capitalize()] ensures the first letter is uppercase.

### Step 2: Combining These Functions

Normally, Without function Composition we would do

```javascript
const formatName = (name) => capitalize(toLowerCase(trim(name)));

console.log(formatName("   JAVASCRIPT   ")); // Output: "Javascript"
```

### Step 3 : By Creating a Compose Function

```javascript
cosnt compose = (...fns) => (val) => fns.reduceRight((acc  ,fn) => fn(acc) , val)
```

How Does ``` Compose ``` work ?

1. It takes multiple functions (...fns)
2. It Process them from right to left using ``` reduceRight ```
3. It applies each function to the accumulated Value .


### Step 4 : Using ``` compose ``` for function composition

``` javascript  
const formattedNameComposed = compose(capitalize , toLowerCase ,trim)
console.log(formattedNameComposed("    JAVASCRIPT      ")) // Output :: Javascript
```


🔷 Function Currying

Function Currying transforms a function that takes multiple arguments in to a series of functions that take one argument at a time 
### Q) Why is Function Currying Important ?

✅ Code Reusablity - Partially apply Functions 
✅ Function Composition - Helps in Creating more composable functions
✅ Avoid Repetition - Reduce redudancy in calling functions

# 🛠 Function Currying in Action

### step 1. Normal Function
``` js 
const finalPrice = (price, tax, discount) => price + price * tax - discount;
console.log(finalPrice(100, 0.2, 10)); // Output: 110
```
But this is not reusable if tax and discount remain constant. We should curry it.
### step 2. Curried Function

``` js 
const curriedPrice = (tax) => discount => price => price + price * tax - discount;
```

``` js
const applyTax10 = curriedFinalPrice(0.1);
const applyTax10With5Discount = applyTax10(5);

console.log(applyTax10With5Discount(100)); // Output: 105
console.log(applyTax10With5Discount(200)); // Output: 215
```



# 🔷  Real World Example  : Function Composition + Function Currying
Let's Build a Logger That Prints Messages in Different Formats
### Step 1 : Define Utility Functions 
``` js

const timeStamp = () => new Date().toISOString();
const prependLogType = (type) => (msg) => `[${type}] ${msg}`;
const appendTimeStamp = (msg) => `${msg} - ${timeStamp()}`;
const logToConsole = (msg) => console.log(msg);
```

### Step 2 : Compose Logging Functions 

``` js 
const composeLog = (...fns) => value => fns.reduceRight((acc ,fn) => fn(acc) , value);

const logMessage = (type) => compose(logToConsole, appendTimeStamp , prependLogType(type));

const infoLog = logMessage("INFO");
const errorLog = logMessage("ERROR");

infoLog("User Logged In");
errorLog("Failed to Connect DB");
```

The Output of above Example Something looks like 
``` js 
[INFO] User logged in - 2025-03-10T10:00:00.000Z
[ERROR] Failed to connect to DB - 2025-03-10T10:00:05.000Z
```

