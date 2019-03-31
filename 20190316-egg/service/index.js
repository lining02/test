const delay = async (data, timer) => {
    return new Promise(resolve => {
         setTimeout(() => {
            resolve(data)
        }, timer)
    })
}

module.exports = async app => ({
    getServiceData() {
        app.$model.user.findAll().then( res => {
            console.log(JSON.stringify(res), 334343433)
            return JSON.stringify(res)
        })
        return {name: 'getServiceData'}
        // console.log(app)
        // return delay({name: 'getServiceData'}, 1000)
    },
    getServiceDataSync() {
        return {name: 'getServiceDataSync'}
    }
})
