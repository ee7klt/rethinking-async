let store = [6,5,4,3,2,1]

store
    .sort((a,b) => a-b)
    .reduce((acc,x,i) => {
    console.log('reducing ',i,' of ',acc.length)
    if (x%2 == 0) acc.splice(i,2,Math.floor(Math.random() * 6) + 1)
    return acc
},store)

console.log(store)

