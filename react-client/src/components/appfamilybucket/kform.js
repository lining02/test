import React from "react";
import { Icon, Button } from "antd";
function hasErrors(fieldsError) {
  // return true
  return Object.keys(fieldsError).every(field => fieldsError[field]);
}
class KInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("KInput", this.props);
    return (
      <div>
        <input {...this.props} />
      </div>
    );
  }
}

function KFormcreate(Comp) {
  class KFormcreateComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.$options = {};
    }
    handleChange = e => {
      let { name, value } = e.target;
      this.setState({ [name]: value }, () => {
        this.getFieldsError();
      });
    };
    validate(name, value) {
      if (!value) {
        this.setState({
          [name + "ErrMessage"]: this.$options[name].rules[0].message
        });
      } else {
        this.setState({
          [name + "ErrMessage"]: ""
        });
      }
    }
    handleFocus = e => {
      let name = e.target.name;
      this.setState(
        {
          [name + "Focus"]: true
        },
        () => {
          console.log(this.state["userNameFocus"]);
        }
      );
    };
    getFieldDecorator = (name, rule, Compon) => {
      this.$options[name] = rule;
      return (
        <div>
          {React.cloneElement(Compon, {
            name, // 控件name
            value: this.state[name] || "", //控件值
            onChange: e => this.handleChange(e), //change事件处理
            onFocus: this.handleFocus // 判断控件是否获得焦点
          })}
        </div>
      );
    };
    getFieldsError = () => {
      return Object.keys(this.$options).map(o => {
        console.log(o);
        this.getFieldError(o);
      });
    };
    getFieldError(name) {
      return this.state[name + "ErrMessage"];
    }
    isFieldTouched = name => {
      console.log(this.state[name + "Focus"]);
      return this.state[name + "Focus"] || false;
    };
    validateFields() {}
    render() {
      console.log("KFormcreateComponent", this.props);
      return (
        <Comp
          getFieldDecorator={this.getFieldDecorator}
          getFieldsError={this.getFieldsError}
          getFieldError={name => this.getFieldsError(name)}
          isFieldTouched={name => this.isFieldTouched(name)}
          validateFields={this.validateFields}
        />
      );
    }
  }
  return KFormcreateComponent;
}

class KFormItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("KFormItem", this.props);
    return <div>{this.props.children}</div>;
  }
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of KForm: ", values);
      }
    });
  };

  render() {
    console.log("HorizontalLoginForm", this.props);
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props;
    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div>
        {isFieldTouched("userName")}
        <KFormItem
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator(
            "userName",
            {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            },
            <KInput
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </KFormItem>
        <KFormItem
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator(
            "password",
            {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            },
            <KInput
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </KFormItem>
        <KFormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </KFormItem>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = KFormcreate(HorizontalLoginForm);

//   ReactDOM.render(<WrappedHorizontalLoginForm />, mountNode);
export default WrappedHorizontalLoginForm;
