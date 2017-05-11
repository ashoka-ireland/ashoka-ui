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


            <hr className="divider" />

            <h2>Section 2 - About Your Work</h2>
            <hr className="divider secondary" />


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

          <hr className="divider secondary" />
          <h4>(If multi) Which would you say is your primary sector in which you operate?</h4>
          <FormItem>
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

          <hr className="divider secondary" />
          <h4>How would you describe what you do in short (1-2 sentences)?</h4>
          <FormItem>
            { getFieldDecorator(constants.DUTIES)(
                <Input type="textarea" rows={4}/>
              )
            }
          </FormItem>

          <hr className="divider secondary" />
          <h4>Why did you start this work (1-2 sentences)?</h4>
          <FormItem>
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

          <hr className="divider secondary" />
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

          <hr className="divider secondary" />
          <h4>(If applicable) How much earned revenue in the most recent financial year?</h4>
          <FormItem
            label="Exact Figure"
            {...formItemLayout}
          >
            <Input placeholder="Revenue Earned" addonBefore="€"/>
          </FormItem>

          <FormItem
            label="Estimate Figure"
            {...formItemLayout}
          >
            <p>
              <Select placeholder="Revenue Earned">
                <Option value="None">None</Option>
                <Option value="0-10k">0-10k</Option>
                <Option value="10-25k">10-25k</Option>
                <Option value="25-50k">25-50k</Option>
                <Option value="50-75k">50-75k</Option>
                <Option value="75-100k">75-100k</Option>
                <Option value="100-250k">100-250k</Option>
                <Option value="250-500k">250-500k</Option>
                <Option value="500-1M">500-1M</Option>
                <Option value="1M+">1M+</Option>
              </Select>
            </p>
          </FormItem>

          <hr className="divider secondary" />
          <h4>(If applicable) How much public funding in the most recent financial year?</h4>
          <FormItem
            label="Exact Figure"
            {...formItemLayout}
          >
            <Input placeholder="Revenue Earned" addonBefore="€"/>
          </FormItem>

          <FormItem
            label="Estimate Figure"
            {...formItemLayout}
          >
            <p>
              <Select placeholder="Revenue Earned">
                <Option value="None">None</Option>
                <Option value="0-10k">0-10k</Option>
                <Option value="10-25k">10-25k</Option>
                <Option value="25-50k">25-50k</Option>
                <Option value="50-75k">50-75k</Option>
                <Option value="75-100k">75-100k</Option>
                <Option value="100-250k">100-250k</Option>
                <Option value="250-500k">250-500k</Option>
                <Option value="500-1M">500-1M</Option>
                <Option value="1M+">1M+</Option>
              </Select>
            </p>
          </FormItem>

          <hr className="divider secondary" />
          <h4>(If applicable) How much Philanthropy in the most recent financial year?</h4>
          <FormItem
            label="Exact Figure"
            {...formItemLayout}
          >
            <Input placeholder="Revenue Earned" addonBefore="€"/>
          </FormItem>

          <FormItem
            label="Estimate Figure"
            {...formItemLayout}
          >
            <p>
              <Select placeholder="Revenue Earned">
                <Option value="None">None</Option>
                <Option value="0-10k">0-10k</Option>
                <Option value="10-25k">10-25k</Option>
                <Option value="25-50k">25-50k</Option>
                <Option value="50-75k">50-75k</Option>
                <Option value="75-100k">75-100k</Option>
                <Option value="100-250k">100-250k</Option>
                <Option value="250-500k">250-500k</Option>
                <Option value="500-1M">500-1M</Option>
                <Option value="1M+">1M+</Option>
              </Select>
            </p>
          </FormItem>

          <hr className="divider secondary" />
          <h4>In which counties is your work having a positive impact?</h4>
          <FormItem
            {...formItemLayout}
            label="Counties"
          >
            <Select placeholder="Select counties">
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

            <p><Input type="textarea" rows={2} placeholder="Interviewer Prompt: Are the counties in which the work is having a positive impact on the lives of people? Enter notes here if needed..."/></p>
          </FormItem>

          <hr className="divider secondary" />

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
          <h4>(If direct service) Number of people directly impacted per year?</h4>
          <FormItem>
            <InputNumber defaultValue="0" />
          </FormItem>

          <hr className="divider secondary" />
          <h4>Are you a registered entity?</h4>
          <FormItem>
            <RadioGroup>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            <p><Input type="textarea" rows={2} placeholder="Interviewer Prompt: In ROI it will be Companies Registration Office (CRO), or in NI the Companies House. Enter notes here if needed..."/></p>
          </FormItem>

          <hr className="divider secondary" />
          <h4>If yes, are you registered as?</h4>
          <FormItem>
            <Select placeholder="Select a type">
              <Option value="A charity">A charity: your organisation is a Non-Profit and is registered with the Company's Regulatory Authority (CRA) and has CHY number. If in Northern Ireland (the equivalent)</Option>
              <Option value="A business">A business: Your organisation is a For-Profit and is a company limited by guarantee with share capital. </Option>
              <Option value="A social enterprise">A social enterprise - Your organisation derives some level of its own revenue through its activities but all revenue earned is ring fenced for uses to achieve its social mission and increase it’s impact. Your organisation is a company limited by guarantee without share capital</Option>
            </Select>
          </FormItem>

          <hr className="divider secondary" />
          <h4>What do you see as the greatest barriers to increasing your impact?</h4>
          <FormItem>
            <Select placeholder="Select a type">
              <Option value="Access to finance">Access to finance: philanthropy and/or opportunities to raise capital through debt or equity finance.</Option>
              <Option value="Access to talent">Access to talent: available and affordable talent with the appropriate skills and experience.</Option>
              <Option value="Current Systems">Current Systems: flaws that exist within the current systems.</Option>
              <Option value="Policy & Legislation">Policy & Legislation: Government policy and Irish law</Option>
              <Option value="Public mindset">Public mindset: How people at a wide scale view a problem</Option>
              <Option value="None of teh above">None of the above</Option>
            </Select>
          </FormItem>

          <hr className="divider secondary" />
          <h4>What do you see as the single greatest barrier to increasing your impact?
</h4>
          <FormItem>
            <Select placeholder="Select a type">
              <Option value="Access to finance">Access to finance: philanthropy and/or opportunities to raise capital through debt or equity finance.</Option>
              <Option value="Access to talent">Access to talent: available and affordable talent with the appropriate skills and experience.</Option>
              <Option value="Current Systems">Current Systems: flaws that exist within the current systems. </Option>
              <Option value="Policy & Legislation">Policy & Legislation: Government policy and Irish law </Option>
              <Option value="Public mindset">Public mindset: How people at a wide scale view a problem</Option>
              <Option value="None of teh above">None of the above</Option>
            </Select>
            <p><Input type="textarea" rows={2} placeholder="Additional notes here if needed..."/></p>
          </FormItem>

          <hr className="divider secondary" />
          <h4>Do you want to be kept up to date with publication of results of the mapping and events in relation to it?</h4>
          <FormItem>
            <RadioGroup>
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            <p><Input type="textarea" rows={2} placeholder="Interviewer Prompt: In ROI it will be Companies Registration Office (CRO), or in NI the Companies House. Enter notes here if needed..."/></p>
          </FormItem>

          <hr className="divider" />

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
