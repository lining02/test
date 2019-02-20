import React, { Component } from 'react'
import { connect } from "react-redux";
import {add, minus, asyncAdd} from '../../store/counter.redux'

@connect(
  state => ({ num: state.counter }), // 状态映射
  { add, minus, asyncAdd }
)
class Counter extends Component {
  change = (type) => {
    this.props[type]()
  }
  render() {
    return (
      <div>
        {this.props.num}
        <button onClick={()=>this.change('add')}>加</button>
        <button onClick={()=>this.change('minus')}>减</button>
        <button onClick={()=>this.change('asyncAdd')}>异步加</button>
      </div>
    )
  }
}

export default Counter
