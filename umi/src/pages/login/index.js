import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less'
import { connect } from 'dva'

@connect(({ loading }) => ({ loading }))
@Form.create()
 class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props)
    const { dispatch, form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'app/login', payload: values })
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
  const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <span className={styles.loginFormForgot}>
            Forgot password
          </span>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            Log in
          </Button>
          Or <span className={styles.c1890ff}>register now!</span>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;