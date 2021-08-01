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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
		let fileNum = file[4];

		// store the files in an array
		store = [...store,{fileNum,text}].sort((a,b) => a.fileNum-b.fileNum);
		
		// pick the first ordered element from store
		nextFileNum = store[0].fileNum;

		// While the next file is one more than the current ...
		while (nextFileNum == expectedFileNum) {
			// make it the currentFile and take it off the array
			[currentFile, ...rest] = store
			store = rest;
			// ... print it.
			// addTextToHTML(currentFile.text)
			nextFileNum = store.length > 0 ? store[0].fileNum : -1;
			++expectedFileNum;
		}
	});
}

function addTextToHTML(text) {
	let e1 = document.getElementById('result');
	let e2 = document.createTextNode(text);
	let e3 = document.createElement('br')
	e1.appendChild(e2);
	e1.appendChild(e3);
}

// request all files at once in "parallel"

let store = [];
let nextFileNum;  		// fileNum of the next file in store
let expectedFileNum = 1;  // tracks which file to expect next
getFile("file1");
getFile("file2");
getFile("file3");
