import React, { Component } from "react";
import Form from "../components/appfamilybucket/form";
import KKKForm from "../components/appfamilybucket/kkkform";
import KKForm from "../components/appfamilybucket/kkform";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Form />
        <KKForm />
        <KKKForm />
      </div>
    );
  }
}

export default App;
