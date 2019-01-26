import React, { Component } from "react";

// 复合组件
function CompoundDialog(props) {
  console.log(props);
  return (
    <div>
      {props.children}
      {props.footer}
    </div>
  );
}

export default class Compound extends Component {
  render() {
    return (
      <CompoundDialog footer={<p>I am footer</p>}>
        <h1>hello React!</h1>
        <p>I am prefect;</p>
      </CompoundDialog>
    );
  }
}
