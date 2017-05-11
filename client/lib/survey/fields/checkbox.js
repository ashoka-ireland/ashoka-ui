import { Checkbox } from 'antd';
import React from 'react';
import { Field } from '.';

const checkbox = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name, { initialValue: field.initialValue })(
        <Checkbox>{field.label}</Checkbox>
      )
    }
  </Field>
);

export default checkbox;
