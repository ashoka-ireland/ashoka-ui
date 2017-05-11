import React, { Component } from 'react';
import { Form, Input, Progress, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
import client from '../api/client';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
};

class Home extends Component {
  submit = () => {
    client.login('ashokasocialapi@gmail.com', process.env.USER_PASSWORD).then(() => {
      client.createUser({
        foo: 'bar'
      });
    });
  }

  render() {
    return (
      <div className="home-page">
        <p className="text-center">
          <h1>Ashoka Changemaker Questionnaire</h1><br />
        </p>
        <hr className="divider"/>
        <h2 className="slogan"><Progress percent={30}/></h2>


        <Form>
          <h2>Section 1 - About You</h2>
          <hr className="divider secondary"/>
          <FormItem
            {...formItemLayout}
            label="First Name"
          >
            <Input placeholder="First Name"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Surname"
          >
            <Input placeholder="Surname"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Email"
          >
            <Input placeholder="Email"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Primary Phone Number"
          >
            <Input addonBefore="+353"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Secondary Phone Number"
          >
            <Input addonBefore="+353"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Website"
          >
            <Input placeholder="Website 1"/>
            <p><Input placeholder="Website 2"/></p>
            <Checkbox>I don't have a website.</Checkbox>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Twitter Username"
          >
            <Input addonBefore="@"/>
            <Checkbox>I don't have one.</Checkbox>
          </FormItem>
          <Button type="primary"
                  htmlType="submit"
                  onClick={this.submit}
                  size="large">
            Submit
          </Button>
        </Form>

      </div>
    );
  }
}

export default Home;
