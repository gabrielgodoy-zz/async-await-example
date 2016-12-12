let request = require('request'),
	quotesAPI = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

function quotePromise () {
	return new Promise((resolve, reject) => {
		request(quotesAPI, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				resolve(JSON.parse(body).quoteText)
			} else {
				reject(error);
			}
		});
	});
}

/*
 async function
 async/await let you write asynchronous code, using synchronous code structure
 */
async function main () {
	let result;
	// await receives a Promise, if rejected goes to catch block with respective error
	try {
		result = await quotePromise();
	} catch (error) {
		result = `Error: ${error}`;
	}
	// It logs only when await is finished
	console.log(result);
}
main();

// This runs synchronosly, before async function
console.log('One more quote,');
