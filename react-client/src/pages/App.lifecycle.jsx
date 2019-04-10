import React, { Component } from 'react';
import Antdform from "../components/applifecycle/Antdform";
import Lnform from "../components/applifecycle/Lnform";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <div className="App">
        <Antdform />
        <Lnform />
      </div>
    );
  }
}

export default App;
