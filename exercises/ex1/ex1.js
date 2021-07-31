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
		let toPrint,toPrintSet
		let fileNum = file[4]
		store = [...store,{fileNum,text}];
		while (store.length !==0) {
			store.sort((a,b) => a.fileNum-b.fileNum)
			toPrint = store.filter(x => x.fileNum <= counter);
			//toPrint.map(x => addTextToHTML(x.text))
			counter += toPrint.length
			toPrintSet = new Set(toPrint);
			store =  store.filter(x => !toPrintSet.has(x))
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
let counter = 1;
getFile("file1");
getFile("file2");
getFile("file3");
