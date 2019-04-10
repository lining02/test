import React, { Component } from 'react';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
function LnFormCreate(Comp) {

    return class NewComp extends Component {
        constructor(props) {
            super(props)
            this.options = {} // 存储 对应的 rules
            this.state = {}
        }
        // input改变
        handleChange(e) {
            let { value, name } = e.target
            this.setState({
                [name]: value
            }, () => {
                this.validateField(name)
            })
        }
        handleFocus(e) {
            let { name } = e.target
            this.setState({
                [name + 'Focus']: true
            })
        }
        validateField(name) {
            let { rules = [] } = this.options[name]
            // rules && rules.every(o => {
            if (rules[0].required && !!!this.state[name]) {
                this.setState({
                    [name + 'Message']: rules[0].message
                })
                return false
            } else {
                this.setState({
                    [name + 'Message']: ''
                })
                return true
            }
            // })
        }
        getFieldDecorator = (label, option) => {
            this.options[label] = option
            return (InputComp) => {
                return (
                    <div>
                        {React.cloneElement(InputComp, {
                            name: label, //控件name
                            value: this.state[label] || "", //控件值
                            onChange: (e) => this.handleChange(e), //change事件处理
                            onFocus: (e) => this.handleFocus(e) // 判断控件是否获得焦点
                        })}
                    </div>
                )
            }
        }
        getFieldsError = () => {
            let obj = {}
            Object.keys(this.options).forEach(o => {
                obj[o] = this.state[o + 'Message']
            })
            return obj
        }
        getFieldError = (field) => {
            return this.state[field + 'Message']
        }
        isFieldTouched = (field) => {
            return this.state[field + 'Focus']
        }
        validateFields = (cb) => {
            let obj = {}
            let a = Object.keys(this.options).every(name => {
                // console.log(name, this.state, this.state[name], this.validateField(name))
                obj[name] = this.state[name]
                return this.validateField(name)
            })
            cb && cb(a, obj)
        }
        render() {
            const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields } = this
            return (
                <Comp form={{ getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, validateFields }} />
            )
        }
    }
}
class Form extends Component {
    render() {
        return (
            <form {...this.props}></form>
        )
    }
}
class FormItem extends Component {
    render() {
        const { help, validatestatus } = this.props
        return (
            <div>
                <div {...this.props}></div>
                {validatestatus === 'error' && (<p style={{ color: 'red' }}>{help}</p>)}
            </div>
        )
    }
}
class Input extends Component {
    render() {
        return (
            <input type="text" {...this.props} />
        )
    }
}
class Button extends Component {
    render() {
        return (
            <button {...this.props} />
        )
    }
}
class LnformCompontent extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', err, values)
            if (!err) {
                // console.log('Received values of form: ',err,  values);
            }
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem validatestatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="Username" />
                    )}
                </FormItem>
                <FormItem
                    validatestatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input type="password" placeholder="Password" />
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


const Lnform = LnFormCreate(LnformCompontent);
export default Lnform;
