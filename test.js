// let store = [6,5,4,3,2,1]

// store
//     .sort((a,b) => a-b)
//     .reduce((acc,x,i) => {
//     console.log('reducing ',i,' of ',acc.length)
//     if (x%2 == 0) acc.splice(i,2,Math.floor(Math.random() * 6) + 1)
//     return acc
// },store)

// console.log(store)

function addAsync(x,y,cb) {
    setTimeout(function(){
        cb(x+y);
    },1000)
}

// var thunk = function(cb){
//     addAsync(10,15,cb)
// }

// thunk(console.log) ;

// function test() {
//     return [].slice.call(arguments,0,1)
// }

// console.log(test(1,2,3))

function makeThunk(fn) {
    var args = [].slice.call(arguments,1);
    return function(cb) {
        args.push(cb);
        fn.apply(null,args);
    }
}

var thunk = makeThunk(addAsync,10,15)
thunk(console.log)

