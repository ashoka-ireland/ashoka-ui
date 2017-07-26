import React, { PropTypes } from 'react';
import { Form, Input, Checkbox, InputNumber, Select } from 'antd';
import worldCountries from 'world-countries';
import { map, orderBy, groupBy } from 'lodash';
import * as constants from '../api/constants';

const Option = Select.Option;
const FormItem = Form.Item;

const countries = orderBy(worldCountries, c => c.name.official);
const nationalities = orderBy(
  map(groupBy(countries, c => c.demonym), cs => cs[0]),
  c => c.demonym
);

const NomineeFormItems = props => {
  const { formItemLayout, form, requireFields } = props;
  const { getFieldDecorator } = form;
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <FormItem {...formItemLayout} label="First Name">
        {getFieldDecorator(constants.FIRST_NAME, {
          rules: [
            { required: requireFields, message: 'Please input a first name' },
          ],
        })(<Input placeholder="First Name" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Surname">
        {getFieldDecorator(constants.LAST_NAME, {
          rules: [
            { required: requireFields, message: 'Please input a last name' },
          ],
        })(<Input placeholder="Surname" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Email">
        {getFieldDecorator(constants.EMAIL, {
          rules: [
            { required: requireFields, message: 'Please input an email' },
          ],
        })(<Input placeholder="Email" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Primary Phone Number">
        {getFieldDecorator(constants.PRIMARY_DIAL_CODE, {
          rules: [
            {
              required: requireFields,
              message: 'Please input a primary phone number',
            },
          ],
        })(<Input addonBefore="+353" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Secondary Phone Number">
        {getFieldDecorator(constants.SECONDARY_DIAL_CODE)(
          <Input addonBefore="+353" />
        )}
      </FormItem>

      <FormItem {...formItemLayout} label="Website">
        {getFieldDecorator(constants.WEBSITE_1)(
          <Input placeholder="Website 1" />
        )}
        <div style={{ paddingTop: 5 }}>
          {getFieldDecorator(constants.WEBSITE_2)(
            <Input placeholder="Website 2" />
          )}
        </div>
        <Checkbox>I don't have a website.</Checkbox>
      </FormItem>
      <FormItem {...formItemLayout} label="Twitter Username">
        {getFieldDecorator(constants.TWITTER_HANDLE)(<Input addonBefore="@" />)}
        <Checkbox>I don't have one.</Checkbox>
      </FormItem>

      <FormItem {...formItemLayout} label="Facebook Profile">
        {getFieldDecorator(constants.FACEBOOK_PROFILE)(
          <Input placeholder="Facebook Profile" />
        )}
        <Checkbox>I don't have one.</Checkbox>
      </FormItem>
      <FormItem {...formItemLayout} label="Gender">
        {getFieldDecorator(constants.GENDER)(
          <Select placeholder="Select a gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="Year of Birth">
        {getFieldDecorator(constants.YEAR_OF_BIRTH)(
          <InputNumber min={1900} max={currentYear} />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="What is Your Nationality?">
        {getFieldDecorator(constants.NATIONALITY)(
          <Select placeholder="Select a nationality">
            {nationalities.map(c =>
              <Option key={c.cca2} value={c.demonym}>
                {c.demonym}
              </Option>
            )}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="In which country do you live?">
        {getFieldDecorator(constants.COUNTRY_OF_RESIDENCE)(
          <Select placeholder="Select a country" combobox>
            {countries.map(c =>
              <Option key={c.cca2} value={c.name.official}>
                {c.name.official}
              </Option>
            )}
          </Select>
        )}
      </FormItem>
    </div>
  );
};

NomineeFormItems.propTypes = {
  requireFields: PropTypes.bool,
  formItemLayout: PropTypes.object,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

NomineeFormItems.defaultProps = {
  requireFields: true,
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  },
};

export default NomineeFormItems;
