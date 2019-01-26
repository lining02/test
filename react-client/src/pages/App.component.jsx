import React, { Component } from "react";
import { Button } from "antd";
import Commentlist from "../components/appcomponent/commentlist";
import Compound from "../components/appcomponent/compound";
import Hoc from "../components/appcomponent/hoccomponent";
import Passvalue from "../components/appcomponent/passvalue1";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    return (
      <div className="Aaa">
        <Button type="primary">Primary</Button>
        <Commentlist />
        <Compound />
        <Hoc from={"河南"} />
        <Passvalue />
      </div>
    );
  }
}

export default App;
