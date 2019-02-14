import React, { Component } from "react";

class Form extends Component {
  render() {
    return <form {...this.props} />;
  }
  Item() {
    return <div>1111</div>;
  }
}
class KKKForm extends Component {
  render() {
    return (
      <Form aa="aa">
        <input />
      </Form>
    );
  }
}

export default KKKForm;
