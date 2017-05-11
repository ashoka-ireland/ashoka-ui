import { Select } from 'antd';
import React from 'react';
import { map } from 'lodash';
import { Field } from '.';

const Option = Select.Option;

const select = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name)(
        <Select placeholder={field.placeholder}>
          {map(field.options, (opt) => (
            <Option key={opt.value} value={opt.value}>{opt.text}</Option>
          ))}
        </Select>
      )
    }
  </Field>
);

export default select;
