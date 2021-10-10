function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	return new Promise((res,err) => {
		fakeAjax(file, text => {
			res(text)
		})
	})

}

// request all files at once in "parallel"
// ???
let file1promise = getFile('file1')
let file2promise = getFile('file2')
let file3promise = getFile('file3')

file1promise
.then((text) => {
	output(text);
	file2promise
	.then((text) => {
		output(text);
		file3promise
		.then((text) => {
			output(text)
		})
	})
})