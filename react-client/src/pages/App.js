import React, { Component } from 'react';
import '../styles/App.css';
import List from '../components/app/list.jsx';
import Cartlist from '../components/app/cartlist';
import Time from '../components/app/time';
import Lifecycle from '../components/app/lifecycle';
import Timetravel from '../components/app/timetravel';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '我是标题',
      showFlag: true,
      value: '',
      goods: [],
      cartlist: [],
      timelist: JSON.parse(sessionStorage.getItem('timelist')) || [],
      life: '传给生命周期组件的值'
    };
  }
  componentWillMount() {
    console.log('父组件 componentWillMount');
    let { timelist } = this.state
    let good = [{
      id: 1,
      name: '牙刷',
      price: 20
    }, {
      id: 0,
      name: '牙膏',
      price: 20
    }, {
      id: 2,
      name: '毛巾',
      price: 20
    }]
    let { cartlist = [], goods = good } = timelist[timelist.length - 1] || {}
    this.setState({
      cartlist,
      goods
    })
  }
  changeValue(value) {
    this.setState({
      value,
      life: value
    })
  }
  addGood() {
    let { goods, value, timelist } = this.state
    if (!value) {
      alert('请输入商品名称')
      return
    }
    let idx = goods.findIndex(o => {
      return o.name === value
    })
    if (idx > -1) {
      alert('已经存在该商品啦')
    } else {
      goods = [...goods, { name: value, price: 10, id: goods.length }]
      timelist.push({
        goods,
        cartlist: this.state.cartlist,
        id: timelist.length
      })
      sessionStorage.setItem('timelist', JSON.stringify(timelist))
      this.setState({
        timelist,
        goods,
        value: ''
      })
    }
  }
  addCart(o) {
    let { cartlist, timelist } = this.state
    let temp = [...cartlist]
    let idx = temp.findIndex(item => {
      return item.id === o.id
    })
    let item = temp[idx]
    if (idx > -1) {
      temp.splice(idx, 1, { ...item, count: item.count + 1 });
    } else {
      temp = [...cartlist, { ...o, count: 1 }]
    }
    timelist.push({
      goods: this.state.goods,
      cartlist: temp,
      id: timelist.length
    })
    sessionStorage.setItem('timelist', JSON.stringify(timelist))
    this.setState({
      cartlist: temp,
      timelist
    })
  }

  cartHander(flag, o) {
    const { cartlist, timelist } = this.state
    let temp = JSON.parse(JSON.stringify(cartlist))
    let idx = temp.findIndex(item => {
      return item.id === o.id
    })
    if (idx < 0) {
      alert('数据有误')
      return
    }
    if (flag === '-' && o.count < 2) {
      temp.splice(idx, 1)
      this.setState({
        cartlist: temp
      })
      return
    }
    switch (flag) {
      case '-':
        temp[idx].count--
        break;
      case '+':
        temp[idx].count++
        break;
      default:
    }
    timelist.push({
      goods: this.state.goods,
      cartlist: temp,
      id: timelist.length
    })
    sessionStorage.setItem('timelist', JSON.stringify(timelist))
    this.setState({
      cartlist: temp,
      timelist
    })
  }
  toHis(o) {
    console.log(o)
    let { goods, cartlist } = o
    this.setState({
      goods, cartlist
    })
  }
  /**
   * 生命周期的顺序
   * 父组件 componentWillMount
   * 
   * 父组件 render
   * componentWillMount
   * render
   * componentDidMount
   * 父组件 componentDidMount
   * 父组件 shouldComponentUpdate
   * 父组件 componentWillUpdate
   * 父组件 render
   * componentWillReceiveProps
   * shouldComponentUpdate
   * componentWillUpdate
   * render
   * componentDidUpdate
   * 父组件 componentDidUpdate
   */
  componentDidMount() { console.log('父组件 componentDidMount'); }
  componentWillUpdate() { console.log('父组件 componentWillUpdate'); }
  componentDidUpdate() { console.log('父组件 componentDidUpdate'); }
  componentWillReceiveProps() { console.log('父组件 componentWillReceiveProps'); }
  componentWillUnmount() { console.log('父组件 componentWillUnmount'); }
  shouldComponentUpdate() { console.log('父组件 shouldComponentUpdate'); return true }
  componentDidCatch() { console.log('父组件 componentDidCatch'); }
  render() {
    console.log('父组件 render')
    const { goods, title, cartlist, timelist } = this.state
    return (
      <div className="App">
        <Time />
        <List goods={goods} title={title} addCart={(o) => this.addCart(o)} />
        <input type="text" placeholder="Please say something..." value={this.state.value} onChange={(e) => this.changeValue(e.target.value)} />
        <button onClick={() => this.addGood()}>新增商品</button>
        <Cartlist cartlist={cartlist} cartHander={(flag, o) => this.cartHander(flag, o)} />
        <Timetravel timelist={timelist} toHis={o => this.toHis(o)} />
        <Lifecycle data="life" />
      </div>
    );
  }
}

export default App;
