import React, { Component } from 'react';
import { Form, Input, InputNumber, Progress, Button, Select, Radio } from 'antd';
import { UserForm } from '../components';
import client from '../api/client';
import * as constants from '../api/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
  },
};

class SurveyPage extends Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      organisation: ''
    };
  }

  onSelectOrg = (value) => {
    this.setState({
      organisation: value
    });
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        client.createUser(values);
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const currentYear = new Date().getFullYear();
    return (
      <div class="home-page">
        <h1 class="text-center">Ashoka Changemaker Questionnaire</h1>
        <br />
        <hr class="divider"/>
        <h2 class="slogan"><Progress percent={30}/></h2>


        <Form>
          <h2>Section 1 - About You</h2>
          <hr className="divider secondary" />

          <UserForm formItemLayout={formItemLayout} form={this.props.form} />

            <FormItem
              {...formItemLayout}
              label="Do you work from an office or home?"
            >
              { getFieldDecorator(constants.PLACE_OF_WORK)(
                  <Select placeholder="Select place of work">
                    <Option value="office">Office</Option>
                    <Option value="home">Home</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="(If office) Office Location"
            >
              { getFieldDecorator(constants.OFFICE_LOCATION)(
                <Select placeholder="Select location of office">
                  <Option value="Antrim">Antrim</Option>
                  <Option value="Armagh">Armagh</Option>
                  <Option value="Carlow">Carlow</Option>
                  <Option value="Cavan">Cavan</Option>
                  <Option value="Clare">Clare</Option>
                  <Option value="Cork">Cork</Option>
                  <Option value="Derry">Derry</Option>
                  <Option value="Donegal">Donegal</Option>
                  <Option value="Down">Down</Option>
                  <Option value="Dublin">Dublin</Option>
                  <Option value="Fermanagh">Fermanagh</Option>
                  <Option value="Galway">Galway</Option>
                  <Option value="Kerry">Kerry</Option>
                  <Option value="Kildare">Kildare</Option>
                  <Option value="Kilkenny">Kilkenny</Option>
                  <Option value="Laois">Laois</Option>
                  <Option value="Leitrim">Leitrim</Option>
                  <Option value="Limerick">Limerick</Option>
                  <Option value="Longford">Longford</Option>
                  <Option value="Louth">Louth</Option>
                  <Option value="Mayo">Mayo</Option>
                  <Option value="Meath">Meath</Option>
                  <Option value="Monaghan">Monaghan</Option>
                  <Option value="Offaly">Offaly</Option>
                  <Option value="Roscommon">Roscommon</Option>
                  <Option value="Sligo">Sligo</Option>
                  <Option value="Tipperary">Tipperary</Option>
                  <Option value="Tyrone">Tyrone</Option>
                  <Option value="Waterford">Waterford</Option>
                  <Option value="Westmeath">Westmeath</Option>
                  <Option value="Wexford">Wexford</Option>
                  <Option value="Wicklow">Wicklow</Option>
                </Select>
                )
              }
              </FormItem>


            <h2>Section 2 - About Your Work</h2>
            <hr className="divider secondary" />

            <FormItem
              label="You've been nominated as a Changemaker in Ireland. Which organisation/s are you involved in to deliver social change?"
            >
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

          <FormItem
            label={`Which of these sectors does (${this.state.organisation}) operate in?`}
          >
            { getFieldDecorator(constants.ORGANISATION_SECTOR)(
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

          <FormItem
            label="(If multi) Which would you say is your primary sector in which you operate?"
          >
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

          <FormItem
            label="How would you describe what you do in short (1-2 sentences)?"
          >
            { getFieldDecorator(constants.DUTIES)(
                <Input type="textarea" rows={4}/>
              )
            }
          </FormItem>

          <FormItem
            label="Why did you start this work (1-2 sentences) ?"
          >
            { getFieldDecorator(constants.REASON_FOR_FIELD_OF_WORK)(
                <Input type="textarea" rows={4}/>
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of full time paid staff"
          >
            { getFieldDecorator(constants.NUM_FULL_TIME_STAFF)(
                <InputNumber initialValue="0"/>
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of part time paid staff"
          >
            { getFieldDecorator(constants.NUM_PART_TIME_STAFF)(
                <InputNumber initialValue="0"/>
              )
            }
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Current number of volunteers (per year)"
          >
            { getFieldDecorator(constants.NUM_VOLUNTEERS)(
                <InputNumber initialValue="0"/>
              )
            }
          </FormItem>

          <FormItem
            label={`Which of these sources of founding does (${this.state.organisation}) have?`}
          >
            { getFieldDecorator(constants.SOURCES_OF_FUNDING)(
                <Select placeholder="Select a sector">
                  <Option value="Earned Revenue">Earned Revenue</Option>
                  <Option value="Public Funding">Public Funding</Option>
                  <Option value="Philanthropy">Philanthropy</Option>
                </Select>
              )
            }
          </FormItem>

          <hr className="divider secondary" />

          <Button type="primary"
                  htmlType="submit"
                  onClick={this.submit}
                  size="large">
            Submit
          </Button>
        </Form>

      </div>
    );
  }
}

export default Form.create()(SurveyPage);
