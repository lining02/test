const http = require('http');
setInterval(async () => {
    try {
        await http.get('http://localhost:3001')
    } catch (error) {
        console.log(error.message)
    }
}, 1000)