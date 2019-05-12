


import a from './a' // es module
const b = require('./b') // common JS
import cc from './1.jpg' 
import css from './1.css' 
import scss from './1.scss' 
console.log(cc, css, scss)
a()
b()

import axios from 'axios'
axios.get('/api').then(res => {
    console.log(res)
})


const  button = document.createElement('button');
const  div = document.querySelector('div')
button.innerHTML = "新增"
document.body.appendChild(button)

button.onclick = function() {
    const  divContent = document.createElement('div');
    document.body.appendChild(divContent)
}


import counter from './counter'
import number from './number'
counter()
number()

if(module.hot) {
    module.hot.accept('./number', () => {
        document.body.removeChild(document.querySelector('#number'))
        number()
    })
}