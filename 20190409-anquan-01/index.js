const app = require('./app/app')
const hack = require('./hack/app');
const chalk = require('chalk')
app.listen(3000, () => {
    console.log(chalk.blue('正常网站启动3000端口成功!'));
})
hack.listen(4000, () => {
    console.log(chalk.red('黑客网站启动4000端口成功!'));
})