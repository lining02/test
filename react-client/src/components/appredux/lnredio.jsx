import React, { Component } from "react";
// 组件设计-redio
class RadioGroup extends Component {
  render() {
    // children 在这里是三个虚拟DOM，children可以是任何js表达式，且children不可修改
    const { children, name } = this.props;
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        name: name
      });
    });
  }
}
class Radio extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <label htmlFor="">
        <input type="radio" {...rest} />
        {children}
      </label>
    );
  }
}
export default class Lnredio extends Component {
  render() {
    return (
      <div>
        <RadioGroup name="mvvm">
          <Radio value="vue">vue</Radio>
          <Radio value="react">react</Radio>
          <Radio value="angular">angular</Radio>
        </RadioGroup>
      </div>
    );
  }
}
