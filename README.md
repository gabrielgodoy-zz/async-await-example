### Async/Await and Promise

`npm i` then `npm start`

Using babel-cli, and those plugins below to run the example:
- syntax-async-functions
- transform-regenerator

Async function can contain await expression, that pauses the execution of the async function and waits for the passed promise's resolution, and resumes the async function's execution and returns the resolved value.

```js
/*
async function
async/await let you write asynchronous code, using synchronous code structure
*/
async function main() {
    let result;
    // await receives a Promise, if rejected goes to catch block with respective error
    try {
        result = await quotePromise();
    } catch (error) {
        result = `Error: ${error}`;
    }
    console.log(result);
}
```
