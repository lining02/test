module.exports = {
    get header() {
        console.log(this, this.req)
        return this.req.headers
    },
    set header(val) {
        this.req.headers = val
    },
    get url() {
        return this.req.url
    }
}