let http = require('http');

function quotePromise() {
    return new Promise((resolve, reject) => {
        /*
        https://nodejs.org/api/http.html#http_http_get_options_callback
        The only difference between this method and http.request()
        is that it sets the method to GET and calls req.end() automatically.
        */
        http.get('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', (res) => {
            const statusCode = res.statusCode;
            const contentType = res.headers['content-type'];
            let rawData = '',
                parsedData = '',
                error;

            if (statusCode !== 200) {
                error = new Error(`Request Failed with status code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
            }
            if (error) {
                // reject promise
                reject(error.message);
                // resume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf-8');

            // Continuously update stream with data
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => {
                try {
                    parsedData = JSON.parse(rawData);
                    // resolve promise
                    resolve(parsedData.quoteText);
                } catch (error) {
                    // reject promise
                    reject(error.message);
                }
            });
        }).on('error', (error) => {
            reject(`Got error ${error.message}`);
        });
    });
}

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

main();

// This runs synchronosly, before async function
console.log('One more quote,');