import React, { Component } from "react";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Form extends Component {
  render() {
    return <form {...this.props} />;
  }
}
class FormItem extends Component {
  render() {
    const { validateStatus, help, children } = this.props;
    return (
      <div>
        {children}
        {validateStatus === "error" && (
          <div style={{ color: "red" }}>{help}</div>
        )}
      </div>
    );
  }
}
class Input extends Component {
  render() {
    let { prefix } = this.props;
    const { props } = prefix;
    return (
      <div>
        {React.cloneElement(prefix, {
          ...props
        })}
        <input type="text" autoComplete={this.props.name} {...this.props} />
      </div>
    );
  }
}
class Icon extends Component {
  render() {
    return <span {...this.props}>{this.props.type}</span>;
  }
}
class Button extends Component {
  render() {
    return <button {...this.props} />;
  }
}
function FormCreate(Lncomponent) {
  class NewLncomponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }
    // input 改变的时候
    handleChange = e => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value
        },
        () => {
          this.validateField(name);
        }
      );
    };
    // input改变则校验
    validateField(name) {
      console.log(name);
      let rule = this.options[name].rules[0];
      if (rule.required && !this.state[name]) {
        this.setState({
          [name + "Message"]: rule.message
        });
        return true;
      } else {
        this.setState({
          [name + "Message"]: ""
        });
        return false;
      }
    }
    // input获取焦点后
    handleFocus = e => {
      const { name } = e.target;
      this.setState({
        [name + "Focus"]: true
      });
    };
    getFieldDecorator = (label, rules) => {
      this.options[label] = rules;
      return InputComponent => {
        return (
          <div>
            {React.cloneElement(InputComponent, {
              name: label, //控件name
              value: this.state[label] || "", //控件值
              onChange: this.handleChange, //change事件处理
              onFocus: this.handleFocus // 判断控件是否获得焦点
            })}
          </div>
        );
      };
    };
    getFieldsError = () => {
      let aa = {};
      Object.keys(this.options).forEach(item => {
        return (aa[item] = this.state[item + "Message"]);
      });
      return aa;
    };
    getFieldError = label => {
      return this.state[label + "Message"] || "";
    };
    isFieldTouched = label => {
      return this.state[label + "Focus"] || false;
    };
    validateFields = cb => {
      let obj = {};
      let aa1 = Object.keys(this.options).map(item => {
        obj[item] = this.state[item];
        return this.validateField(item);
      });
      let aa = aa1.some(o => {
        return o;
      });
      cb && cb(aa, obj);
    };
    render() {
      const {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched,
        validateFields
      } = this;
      return (
        <Lncomponent
          form={{
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched,
            validateFields
          }}
        />
      );
    }
  }
  return NewLncomponent;
}
class LnformCompontent extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err, values);
      if (!err) {
        // console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{ margin: "0 0 0 200px" }}
      >
        <FormItem
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmltype="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const Lnform = FormCreate(LnformCompontent);
export default Lnform;
