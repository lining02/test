module.exports = {
    '41 * * * *': function (fireDate) {
        console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
    },
    '42 * * * *': function (fireDate) {
        console.log('This2 job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
    }
}