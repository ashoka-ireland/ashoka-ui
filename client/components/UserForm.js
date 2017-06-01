import React, { PropTypes } from 'react';
import { Form, InputNumber, Select } from 'antd';
import worldCountries from 'world-countries';
import { map, orderBy, groupBy } from 'lodash';
import * as constants from '../api/constants';
import NomineeForm from './NomineeForm';

const Option = Select.Option;
const FormItem = Form.Item;

const countries = orderBy(worldCountries, (c) => c.name.official);
const nationalities = orderBy(map(
  groupBy(countries, (c) => c.demonym),
  (cs) => (cs[0])
), (c) => c.demonym);

const UserForm = (props) => {
  const { formItemLayout, form } = props;
  const { getFieldDecorator } = form;
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <NomineeForm {...props} />

      <FormItem
        {...formItemLayout}
        label="Year of Birth"
      >
        <InputNumber defaultValue={currentYear} min={1900} max={currentYear} />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="What is Your Nationality?"
      >
        { getFieldDecorator(constants.NATIONALITY)(
          <Select placeholder="Select a nationality">
            {nationalities.map(c => (
              <Option key={c.cca2} value={c.demonym}>{c.demonym}</Option>
            ))}
          </Select>
          )
        }
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="In which country do you live?"
      >
        { getFieldDecorator(constants.COUNTRY_OF_RESIDENCE)(
          <Select placeholder="Select a country">
            {countries.map(c => (
              <Option key={c.cca2} value={c.name.official}>{c.name.official}</Option>
            ))}
          </Select>
          )
        }
      </FormItem>
    </div>
  );
};

UserForm.propTypes = {
  formItemLayout: PropTypes.object,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};

UserForm.defaultProps = {
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

export default UserForm;
