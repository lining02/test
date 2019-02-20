import React, { Component } from "react";
import Lnredio from "../components/appredux/lnredio";
import Counter from "../components/appredux/counter";
import Routers from "../components/appredux/routers";
export default class App extends Component {
  render() {
    return (
      <div>
        <Lnredio />
        <Counter />
        <Routers />
      </div>
    );
  }
}
