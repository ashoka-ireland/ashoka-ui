import { Form, Button, Row, Switch, Input, Table } from 'antd';
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import DualListBox from 'react-dual-listbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { map, mapValues } from 'lodash';
import client from '../api/client';
import { actions as nomineeActions } from '../reducers/nominees/actions';
import { actions as orgActions } from '../reducers/organizations/actions';
import { actions as surveyActions } from '../reducers/surveys/actions';
import { NomineeFormItems } from '../components';
import * as constants from '../api/constants';

const actions = { ...nomineeActions, ...orgActions, ...surveyActions };
const FormItem = Form.Item;
const columns = [{
  dataIndex: 'key',
  key: 'key',
  title: 'Survey Id',
  render: (text, record) => (
    <Link to={`/nominees/${record.nomineeId}/surveys/${record.key}`}>
      {record.key}
    </Link>
  )
}];

class NomineePage extends Component {

  componentWillMount = () => {
    if (this.props.params.nomineeKey == 'create') {
      // Clear previous nominee
      this.props.actions.getNominee(null);
      this.props.actions.listNomineeSurveys(null);
    } else {
      this.props.actions.getNominee(this.props.params.nomineeKey);
      this.props.actions.listNomineeSurveys(this.props.params.nomineeKey);
    }
    this.props.actions.listOrganizations();
  }

  addSurvey = (e) => {
    e.preventDefault();
    browserHistory.push(`/nominees/${this.props.params.nomineeKey}/surveys/create`);
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const updatedNominee = Object.assign({}, this.props.nominee, values);
        client.createNominee(updatedNominee);
        this.props.history.push('/nominees');
      }
    });
  }

  saveNomineeOrgs = (orgs) => {
    console.log('Save Nominee Orgs: ', orgs);
    this.props.actions.saveNomineeOrganizations({
      nomineeId: this.props.params.nomineeKey,
      orgs
    });
  }

  render = () => {
    const orgs = map(this.props.organizations, ({ name }) => (
      { value: name, label: name }
    ));

    return (
      <main class="container">
        <div className="nominee-page">
          <Form>
            <h1>Nomination Form</h1>

            <FormItem
              {...this.props.form.formItemLayout}
              label="Draft"
            >
              { this.props.form.getFieldDecorator(constants.DRAFT, {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Switch />
              )}
            </FormItem>

            <hr className="divider secondary" />

            <NomineeFormItems form={this.props.form} requireFields={false} />

            <FormItem
              {...this.props.form.formItemLayout}
              label="Additional Notes"
            >
              { this.props.form.getFieldDecorator(constants.ADDITIONAL_NOMINEE_INFO)(
                  <Input type="textarea" rows={3} />
                )
              }
            </FormItem>

            <hr className="divider secondary" />

            <Row>
              <Button type="primary"
                      htmlType="submit"
                      onClick={this.submit}
                      style={{ marginLeft: 20 }}
                      size="large">
                Save Nominee
              </Button>
            </Row>
          </Form>

          <hr className="divider" />

          <div className="nominee-org-labels">
            <div><span>Available Organisations</span></div>
            <div><span>Nominee Organisations</span></div>
          </div>

          <DualListBox
            canFilter
            options={orgs}
            selected={this.props.nomineeOrganizations}
            onChange={this.saveNomineeOrgs}
          />

          <hr className="divider" />

          <h2>Nominee Surveys</h2>
          <Button type="primary" icon="plus" onClick={this.addSurvey} >
            Add Survey
          </Button>
          <Table columns={columns} dataSource={this.props.nomineeProfiles} />
        </div>
      </main>
    );
  }
}

NomineePage.propTypes = {
  nominee: PropTypes.object,
  nomineeProfiles: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  nomineeOrganizations: PropTypes.array.isRequired,
  params: PropTypes.shape({
    nomineeKey: PropTypes.string
  }),
  actions: PropTypes.shape({
    getNominee: PropTypes.func.isRequired,
    listOrganizations: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  nominee: state.nominee,
  nomineeProfiles: state.nomineeProfiles || [],
  organizations: state.organizations,
  nomineeOrganizations: state.nomineeOrganizations || []
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields: (props) => mapValues(props.nominee, (value) => ({ value }))
})(NomineePage));
