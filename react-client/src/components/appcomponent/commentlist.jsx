import React, { Component } from "react";
import Commenitem from "./commentitem1";
export default class Commentlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  // 组件已挂载
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          {
            message: "react is prefect",
            author: "facebook"
          },
          {
            message: "vue is prefect",
            author: "youyuxi"
          }
        ]
      });
    }, 1000);
  }

  render() {
    let { comments } = this.state;
    return (
      <div>
        {comments.map(o => {
          return <Commenitem message={o.message} key={o.author} />;
        })}
      </div>
    );
  }
}
