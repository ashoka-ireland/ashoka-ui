import { Input, InputNumber } from 'antd';
import React from 'react';
import { Field } from '.';

export const text = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name)(
        <Input placeholder={field.placeholder} addonBefore={field.addonBefore} />
      )
    }
  </Field>
);

export const textarea = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name)(
        <Input type="textarea" rows={field.rows} placeholder={field.placeholder}/>
      )
    }
  </Field>
);

export const number = (field, formItemLayout, { getFieldDecorator }) => (
  <Field key={field.name} field={field} layout={formItemLayout}>
    { getFieldDecorator(field.name)(
        <InputNumber
          initialValue={field.initialValue}
          placeholder={field.placeholder}
          addonBefore={field.addonBefore}
          min={field.min}
          max={field.max}
        />
      )
    }
  </Field>
);
