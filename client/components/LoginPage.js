import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Row,
  Col
} from 'antd';
const FormItem = Form.Item;
const logo = require('assets/img/logo-dark.png');

const userIcon = <Icon type="user" />;
const passwordIcon = <Icon type="lock" />;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForgotPassword: true
    };
  }

  handleSubmit() {
    console.debug('handleSubmit');
  }

  renderForgotPassword() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <a type="button" onClick={() =>  (this.setState({ showForgotPassword: false }))}>
          Back to Login
        </a>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('emailAddress', {
              rules: [{ required: true, message: 'Please input your email address!' }],
            })(
              <Input prefix={userIcon} placeholder="Email Address..." />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Send
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  renderLoginForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={userIcon} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={passwordIcon} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a
            type="button"
            class="login-form-forgot"
            onClick={() => (this.setState({
              showForgotPassword: true
            }))}>
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }

  render() {
    const { showForgotPassword } = this.state;

    return (
      <Row type="flex" style={{ height: '100vh' }} justify="center" align="center">
        <Col style={{ margin: 'auto', maxWidth: 400 }}>
          <img src={logo} alt="Ashoka" class="login-logo" />
          <Card style={{ padding: '1em 2em 0' }}>
            {showForgotPassword ? this.renderForgotPassword() : this.renderLoginForm()}
          </Card>
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object
};

export default Form.create()(LoginPage);
