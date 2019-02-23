import React, { Component } from 'react'
import { connect } from "react-redux";
import {add, minus, asyncCount} from '../../store/counter.redux.saga'

@connect(
  state => ({ num: state.counter }), // 状态映射
  { add, minus, asyncCount }
)
class Counter extends Component {
  // 向saga-传值
  change = ({type, flag}) => {
    this.props[type](flag)
  }
  render() {
    return (
      <div>
        {this.props.num}
        <button onClick={()=>this.change('add')}>加</button>
        <button onClick={()=>this.change('minus')}>减</button>
        <button onClick={()=>this.change({type: 'asyncCount', flag: 'add'})}>异步加</button>
        <button onClick={()=>this.change({type: 'asyncCount', flag: 'minus'})}>异步减</button>
      </div>
    )
  }
}

export default Counter
