import React, {
  Component,
  PropTypes,
} from 'react';


import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class OrganizationDetailsForm extends Component {
  onSave = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if(errors) return;

      this.props.onSave(Object.assign({}, this.props.organization, values));
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <hr className="divider secondary" />
        <FormItem label="Name">
          {
            getFieldDecorator('name', {
              initialValue: this.props.organization.name || ''
            })(<Input placeholder="Organization 1"/>)
          }
        </FormItem>
        <Button type="primary"
                htmlType="submit"
                onClick={this.onSave}
                size="large">
          Save
        </Button>
      </Form>
    );
  }
}

OrganizationDetailsForm.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string
  }),
  onSave: PropTypes.func
};

OrganizationDetailsForm.defaultProps = {
  organization: {},
  onSave: () => {}
};

export default Form.create()(OrganizationDetailsForm);
