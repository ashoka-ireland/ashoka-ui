import React, { PropTypes } from 'react';
import { Form, Button } from 'antd';
import { mapValues } from 'lodash';
import NomineeFormItems from './NomineeFormItems';

const mapNomineeToForm = (props) => mapValues(props.nominee, value => ({ value }));

const submitForm = (form, onSubmit) => {
  return (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
};

const NomineeForm = (props) => {
  const { formItemLayout, form } = props;
  return (
    <Form>
      <NomineeFormItems
        formItemLayout={formItemLayout}
        form={form}
      />

      <Button
        type="primary"
        htmlType="submit"
        onClick={submitForm(form, props.onSubmit)}
        size="large"
      >
        Save
      </Button>
    </Form>
  );
};

NomineeForm.propTypes = {
  nominee: PropTypes.object,
  requireFields: PropTypes.bool,
  formItemLayout: PropTypes.object,
  onSubmit: PropTypes.func,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};

NomineeForm.defaultProps = {
  onSubmit: () => {}
};

NomineeForm.defaultProps = {
  requireFields: true,
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

export default Form.create({
  mapPropsToFields: mapNomineeToForm
})(NomineeForm);
