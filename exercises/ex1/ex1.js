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
		//console.log('counter = ', counter)
		let fileNum = file[4]
		store = [...store,{fileNum,text}];
		// console.log('before reduce')
		// store.map(x => console.log(x.fileNum))
		//console.log('__________')
		store
			.sort((a,b) => a.fileNum-b.fileNum)
			.reduce((acc,x,i) => {
				// console.log('fileNum ===', x.fileNum, ', counter = ',counter)
				// console.log('fileNum == counter ', x.fileNum == counter)
				console.log('reducing ',i+1,' of ',acc.length)
				if (x.fileNum == counter) {
					// addTextToHTML(JSON.stringify(x))
					acc.splice(i,1)
					counter += 1;
				}
				// console.log('after reduce')
				// store.map(x => console.log(x.fileNum))
				// console.log('__________')
				return acc
			}, store)

		
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
let counter = 1;
getFile("file1");
getFile("file2");
getFile("file3");
