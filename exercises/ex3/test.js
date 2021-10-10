

let delay = num => {
    return new Promise((res,rej) => {
        setTimeout(res,num);
    })
}

delay(100)
.then(()=> {
    return delay(50)
})
.then(() => {
    return delay(300);
})
.then(()=>{
    console.log('all done')
})