import React, { PropTypes } from 'react';
import { Form, Input, Checkbox, Select } from 'antd';
import * as constants from '../api/constants';

const Option = Select.Option;
const FormItem = Form.Item;

const NomineeForm = ({ formItemLayout, form }) => {
  const { getFieldDecorator } = form;
  return (
    <div>
      <FormItem
        {...formItemLayout}
        label="First Name">
        { getFieldDecorator(constants.FIRST_NAME, {
          rules: [{ required: true, message: 'Please input a first name' }],
        })(
            <Input placeholder="First Name" />
          )
        }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Surname"
      >
        { getFieldDecorator(constants.LAST_NAME, {
          rules: [{ required: true, message: 'Please input a last name' }],
        })(
            <Input placeholder="Surname"/>
          )
        }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Email"
      >
        { getFieldDecorator(constants.EMAIL, {
          rules: [{ required: true, message: 'Please input an email' }],
        })(
            <Input placeholder="Email"/>
          )
        }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Primary Phone Number"
      >
      { getFieldDecorator(constants.PRIMARY_DIAL_CODE, {
        rules: [
          { required: true, message: 'Please input a primary phone number' }
        ],
      })(
          <Input addonBefore="+353"/>
        )
      }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Secondary Phone Number"
      >
      { getFieldDecorator(constants.SECONDARY_DIAL_CODE)(
          <Input addonBefore="+353"/>
        )
      }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Website"
      >
        { getFieldDecorator(constants.WEBSITE_1)(
            <Input placeholder="Website 1"/>
          )
        }
        <div style={{ paddingTop: 5 }}>
          { getFieldDecorator(constants.WEBSITE_2)(
              <Input placeholder="Website 2"/>
            )
          }
        </div>
        <Checkbox>I don't have a website.</Checkbox>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Twitter Username"
      >
        { getFieldDecorator(constants.TWITTER_HANDLE)(
            <Input addonBefore="@"/>
          )
        }
        <Checkbox>I don't have one.</Checkbox>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Facebook Profile"
      >
        { getFieldDecorator(constants.FACEBOOK_PROFILE)(
            <Input placeholder="Facebook Profile"/>
          )
        }
        <Checkbox>I don't have one.</Checkbox>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Gender"
      >
        { getFieldDecorator(constants.GENDER)(
            <Select placeholder="Select a gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          )
        }
      </FormItem>
    </div>
  );
};

NomineeForm.propTypes = {
  formItemLayout: PropTypes.object,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};

NomineeForm.defaultProps = {
  formItemLayout: {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
  }
};

export default NomineeForm;
