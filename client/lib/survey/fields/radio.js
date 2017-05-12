import { Radio } from 'antd';
import React from 'react';
import { map } from 'lodash';
import { Field } from '.';

const RadioGroup = Radio.Group;

const radio = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name)(
      <RadioGroup>
        {map(field.options, (opt) => (
          <Radio key={opt.value} value={opt.value}>{opt.text}</Radio>
        ))}
      </RadioGroup>
      )
    }
  </Field>
);

export default radio;
