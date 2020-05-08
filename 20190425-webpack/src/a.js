function a() {
    console.log('--------a--------')
    const arr = [1,2,3,4]
    arr.map(o =>{
        return o%2
    })
    console.log(arr)
}

export default a