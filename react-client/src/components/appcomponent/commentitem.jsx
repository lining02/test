import React, { Component } from "react";

export default class Commenitem extends Component {
  shouldComponentUpdate(preProp) {
    // 判断props是否改变，改变则flag为ture，需要重新rander
    let flag = false;
    for (let i in preProp.comment) {
      if (preProp[i] !== this.props[i]) {
        flag = true;
      }
    }
    return flag;
  }
  render() {
    let { comment } = this.props;
    console.log("render");
    return (
      <div>
        <p>{comment.message}</p>
      </div>
    );
  }
}
