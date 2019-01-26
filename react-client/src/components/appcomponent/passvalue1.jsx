import React, { Component, createContext } from "react";
// context传值和hoc高阶函数
const testContext = createContext();
const TestProvider = testContext.Provider;
const TestConsumer = testContext.Consumer;
const testVal = {
  name: "lining",
  age: 18,
  sayName() {
    console.log(`my name is ${this.name},  I am ${this.age} years old`);
  }
};
function WithProvider(Comp) {
  console.log("WithProvider");
  class WithProviderT extends Component {
    render() {
      return (
        <div>
          <TestProvider value={testVal}>
            <Comp {...this.props} />
          </TestProvider>
        </div>
      );
    }
  }
  return WithProviderT;
}
function WithConsumer(Comp) {
  console.log("WithConsumer");
  class WithConsumerT extends Component {
    render() {
      return (
        <div>
          <TestConsumer>
            {value => <Comp {...this.props} value={value} />}
          </TestConsumer>
        </div>
      );
    }
  }
  return WithConsumerT;
}

@WithConsumer
class Child extends Component {
  render() {
    console.log("Child");
    let value = this.props.value;
    return (
      <div>
        <div onClick={() => value.sayName()}>{`my name is ${
          value.name
        },  I am ${value.age} years old`}</div>
      </div>
    );
  }
}

@WithProvider
class Passvalue extends Component {
  render() {
    console.log("Passvalue");
    return (
      <div>
        <Child />
      </div>
    );
  }
}

export default Passvalue;
