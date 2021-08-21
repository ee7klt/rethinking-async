function addSync(x,y,cb) {
    setTimeout(function(){
        cb(x+y);
    },1000)
}

// var thunk = function(cb) {
//     addSync(10,15,cb);
// }

function makeThunk(fn) {
    var args = [].slice.call(arguments,1);
    return function(cb) {
        args.push(cb);
        fn.apply(null,args);
    }
}

var thunk1 = makeThunk(addSync,10,15);

thunk1(function(sum){
    var x = sum;
    var thunk2 = makeThunk(addSync,1,2);
    thunk2(function(sum){
        console.log(sum+x);
    })
})

