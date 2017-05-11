import React, { Component, PropTypes } from 'react';
import { Form, Input, InputNumber, Radio, Select } from 'antd';
import * as constants from '../api/constants';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class OrganisationForm extends Component {
  constructor(props){
    super(props);
    this.state = { organisation: '' };
  }

  onSelectOrg = (value) => {
    this.setState({ organisation: value });
  }

  render = () => {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const currentYear = new Date().getFullYear();
    return (
      <div>
        <h4>You've been nominated as a Changemaker in Ireland. Which organisation/s are you involved in to deliver social change?</h4>
        <FormItem>
          { getFieldDecorator(constants.ORGANISATION)(
              <Select placeholder="Select an organisation" onChange={this.onSelectOrg}>
                <Option value="Organisation 1" key="Organisation 1">Oranistaion 1</Option>
                <Option value="Organisation 2" key="Organisation 2">Organisation 2</Option>
                <Option value="Organisation 3" key="Organisation 3">Organisation 3</Option>
                <Option value="Organisation 4" key="Organisation 4">Organisation 4</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`Are you a founder of (${this.state.organisation})?`}
        >
          { getFieldDecorator(constants.ORGANISATION_FOUNDER)(
              <RadioGroup>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`What is your job title in (${this.state.organisation})?`}
        >
          { getFieldDecorator(constants.JOB_TITLE)(
              <Input placeholder="Job Title" />
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`Year ${this.state.organisation} was founded`}
        >
          { getFieldDecorator(constants.YEAR_FOUNDED)(
              <InputNumber initialValue={currentYear} min={1900} max={currentYear} />
            )
          }
        </FormItem>
        <hr className="divider secondary" />
        <h4>{`Which of these sectors does (${this.state.organisation}) operate in?`}</h4>
        <FormItem>
          { getFieldDecorator(constants.USER_SECTOR)(
              <Select placeholder="Select a sector">
                <Option value="Protecting & Preserving the Planet">Protecting & Preserving the Planet</Option>
                <Option value="Social Inclusion">Social Inclusion</Option>
                <Option value="Physical & Mental Well-being">Physical & Mental Well-being</Option>
                <Option value="Educating & Developing Skills">Educating & Developing Skills</Option>
                <Option value="Human Rights">Human Rights</Option>
              </Select>
            )
          }
        </FormItem>
        <h4>{`Which of these sources of founding does (${this.state.organisation}) have?`}</h4>
        <FormItem>
          { getFieldDecorator(constants.SOURCES_OF_FUNDING)(
              <Select placeholder="Select a sector">
                <Option value="Earned Revenue">Earned Revenue</Option>
                <Option value="Public Funding">Public Funding</Option>
                <Option value="Philanthropy">Philanthropy</Option>
              </Select>
            )
          }
        </FormItem>
        <h4>{`How would you describe your primary type of impact (${this.state.organisation})has?`}</h4>
        <FormItem>
          <Select placeholder="Select a type">
            <Option value="Direct Service">Direct Service: your work serves a direct need of people (Clarify if necessary: i.e. hungry people being fed, free legal services in disadvantaged communities,  mentoring programmes for student).</Option>
            <Option value="System Change">System Change: your work addresses the root problem. Often involves policy and or legislative change or creation or widespread adoption of your methodology by leading organisations in your sector (Clarify if necessary: i.e microlending, fairtrade etc)</Option>
            <Option value="Changing Public">Changing Public (and/or) government Perception and Opinion: your work has influenced individual mindsets at a large scale which will ultimately change behaviours across society as a whole (Clarify if necessary:  i.e social entrepreneurship as an idea or women's rights)</Option>
          </Select>

          <p><Input type="textarea" rows={2} placeholder="Interviewer Notes..."/></p>
        </FormItem>
        <hr className="divider secondary" />
      </div>
    );
  }
}

OrganisationForm.propTypes = {
  formItemLayout: PropTypes.object,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};

OrganisationForm.defaultProps = {
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

export default OrganisationForm;
