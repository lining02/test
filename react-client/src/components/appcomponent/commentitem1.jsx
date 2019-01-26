import React, { PureComponent } from "react";

export default class commentitem extends PureComponent {
  // PureComponent 浅比较props是否改变，从而判断是否刷新
  render() {
    let { message } = this.props;
    console.log("render");
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
}
