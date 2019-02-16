import React, { Component } from "react";
import Form from "../components/appfamilybucket/form";
import Lnform from "../components/appfamilybucket/lnform";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Form />
        <Lnform />
      </div>
    );
  }
}

export default App;
