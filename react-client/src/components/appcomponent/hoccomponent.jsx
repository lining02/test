import React, { Component } from "react";
// hoc高阶组件

@Hoc2
@Hoc3
class Hoc1 extends Component {
  render() {
    const { name, age, from } = this.props;
    return (
      <div>
        <p>
          {name}现在{age}, 来自{from}
        </p>
      </div>
    );
  }
}

function Hoc2(Comp) {
  console.log("hoc2");
  class Hoc extends Component {
    render() {
      return (
        <div>
          <Comp name={"lining"} {...this.props} />
        </div>
      );
    }
  }
  return Hoc;
}

function Hoc3(Comp) {
  console.log("hoc3");
  class Hoc extends Component {
    render() {
      return (
        <div>
          <Comp age={18} {...this.props} />
        </div>
      );
    }
  }
  return Hoc;
}

// export default Hoc3(Hoc2(Hoc1)); // 2-3-1

export default Hoc1;
