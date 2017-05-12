import { Form, Button, Icon } from 'antd';
import { map } from 'lodash';
import React from 'react';
import { factories } from '.';
import uuid from '../../uuid';

const FormItem = Form.Item;

export const list = (field, formItemLayout, { getFieldDecorator, getFieldValue, setFieldsValue }) => {
  getFieldDecorator(field.name, { initialValue: [] });

  const buildField = (key, childField, getFieldDecorator, formItemLayout) => {
    const getChildFieldDecorator = (name, opts) => (
      getFieldDecorator(`${field.name}-${key}-${name}`, opts)
    );
    return factories[childField.type](childField, getChildFieldDecorator, formItemLayout);
  };

  const remove = (k) => {
    const keys = getFieldValue(field.name);
    setFieldsValue({
      [field.name]: keys.filter(key => key !== k),
    });
  };

  const add = () => {
    const keys = getFieldValue(field.name);
    const nextKeys = keys.concat(uuid());
    setFieldsValue({
      [field.name]: nextKeys,
    });
  };

  const formItems = map(getFieldValue(field.name), (key) => (
    <div key={`${field.name}-${key}`}>
      <hr className="divider secondary" />
      <Icon
        className="dynamic-delete-button"
        type="minus-circle-o"
        onClick={() => remove(key)}
      />
      { map(field.fields, (f) => buildField(key, f, getFieldDecorator, formItemLayout)) }
      <hr className="divider secondary" />
    </div>
  ));

  return (
    <div key={field.name}>
      <h4>{field.label}</h4>
      { formItems }
      <FormItem {...formItemLayout}>
        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> {field.addFieldLabel}
        </Button>
      </FormItem>
    </div>
  );
};
