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

function getFile(file) {   // this is the thunk constructor
	// what do we do here?
	var text, fn;
	fakeAjax(file,function(response) {  // immediately kick-off ajax request      			// text is closed in by fakeAjax	
		if (fn) fn(response);	// if fn is set, print out the file.
		else text = response; 							     
	});
	return function(cb) {         // text is accessible here
		if (text) cb(text);
		else fn = cb;           // if text has not been set, then 
		
	}
	
}


var thunk1 = getFile('file1')
var thunk2 = getFile('file2')
var thunk3 = getFile('file3')
 
thunk1(function(text){
	output(text)
	thunk2(function(text){
		output(text)
		thunk3(function(text){
			output(text)
		})
	})
})

// request all files at once in "parallel"
// ???






