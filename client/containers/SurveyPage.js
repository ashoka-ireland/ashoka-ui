import { notification, Tabs } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as ReactSurvey from 'survey-react';
import { connect } from 'react-redux';
import { NomineeForm } from '../components';
import { actions as nomineeActions } from '../reducers/nominees/actions';
import { actions as surveyActions } from '../reducers/surveys/actions';
import client from '../api/client';
import 'survey-react/survey.css';

ReactSurvey.Survey.cssType = 'bootstrap';
const TabPane = Tabs.TabPane;
const actions = { ...nomineeActions, ...surveyActions };

class SurveyPage extends Component {

  componentDidMount = () => {
    this.props.actions.loadSurveyModel();
    if (this.props.params.nomineeKey == 'create') {
      // Clear previous profile
      this.props.actions.getProfile(null);
    } else {
      this.props.actions.getProfile(this.props.params.surveyKey);
    }
  }

  submitSurvey = ({ data }) => {
    const { nominee, ...profile } = data; // eslint-disable-line

    if (this.props.params.surveyKey) {
      profile.key = this.props.params.surveyKey;
    }

    client.saveSurvey(this.props.profileNominee.id, profile).then(() => {
      notification.success({title: 'Survey saved!'});
    });
  }

  submitNominee = (nominee) => {
    if (this.props.profileNominee.id) {
      nominee.key = this.props.profileNominee.id;
    }

    this.props.actions.saveNominee(nominee);
    notification.success({title: 'Nominee saved!'});
  }

  render = () => {
    const { survey, profile, profileNominee } = this.props;
    const model = new ReactSurvey.Model(survey);
    model.onComplete.add(this.submitSurvey);
    model.data = profile;

    const tabs = [
      <TabPane tab="Organization 1" key="1">TODO: Org Form</TabPane>,
      <TabPane tab="Organization 2" key="2">TODO: Org Form</TabPane>,
      <TabPane tab="Organization 3" key="3">TODO: Org Form</TabPane>
    ];

    return (
      <main class="container">
        <h2>Nominee Details</h2>

        <NomineeForm onSubmit={this.submitNominee} nominee={profileNominee} />

        <hr className="divider" />

        <h2>Organization Details</h2>
        <Tabs defaultActiveKey="1">
          {tabs}
        </Tabs>
        {/*<OrganisationForm key='org-form' formItemLayout={formItemLayout} form={form} />*/}

        <hr className="divider" />

        <ReactSurvey.Survey model={model} />

      </main>
    );
  }

}

SurveyPage.propTypes = {
  form: PropTypes.object,
  survey: PropTypes.object,
  profile: PropTypes.object,
  profileNominee: PropTypes.object,
  profileOrganizations: PropTypes.array
};

const mapStateToProps = (state) => ({
  survey: state.survey,
  profile: state.profile,
  profileNominee: state.profileNominee,
  profileOrganizations: state.profileOrganizations
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);
