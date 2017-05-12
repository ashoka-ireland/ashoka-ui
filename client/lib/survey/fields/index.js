import { Form, Input } from 'antd';
import React, { PropTypes } from 'react';
import { list } from './subSectionBuilder';
import { text, textarea, number } from './text';
import checkbox from './checkbox';
import select from './select';
import radio from './radio';

const FormItem = Form.Item;

export const TEXT = 'text';
export const TEXT_AREA = 'textarea';
export const NUMBER = 'number';
export const SELECT = 'select';
export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';
export const SUB_SECTION_LIST = 'sub-section-list';
export const CUSTOM = 'custom';

const custom = (field, formItemLayout, form) => (
  field.customField(formItemLayout, form)
);

export const factories = {
  [TEXT]: text,
  [TEXT_AREA]: textarea,
  [NUMBER]: number,
  [SELECT]: select,
  [CHECKBOX]: checkbox,
  [RADIO]: radio,
  [SUB_SECTION_LIST]: list,
  [CUSTOM]: custom
};

export const Field = (props) => {
  const { field, layout, children } = props;

  let longLabel;
  if(field.longLabel) {
    longLabel = <h4>{field.longLabel}</h4>;
  }

  let additionalNotes;
  if(field.additionalNotes) {
    additionalNotes = (
      <p><Input type="textarea" rows={2} placeholder={field.additionalNotes} /></p>
    );
  }

  return (
    <div>
      { longLabel }
      <FormItem {...layout} label={field.label}>
        { children }
        { additionalNotes }
      </FormItem>
    </div>
  );
};

Field.propTypes = {
  layout: PropTypes.object,
  field: PropTypes.object,
  children: PropTypes.node
};
