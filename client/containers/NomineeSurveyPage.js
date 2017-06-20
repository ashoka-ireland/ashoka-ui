import { notification, Tabs } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as ReactSurvey from 'survey-react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { NomineeForm, OrganisationForm } from '../components';
import { actions as nomineeActions } from '../reducers/nominees/actions';
import { actions as surveyActions } from '../reducers/surveys/actions';
import client from '../api/client';
import 'survey-react/survey.css';

ReactSurvey.Survey.cssType = 'bootstrap';
const TabPane = Tabs.TabPane;
const actions = { ...nomineeActions, ...surveyActions };

class NomineeSurveyPage extends Component {

  componentDidMount = () => {
    this.props.actions.loadSurveyModel();
    this.props.actions.loadSurveyOrgModel();
    this.props.actions.getNominee(this.props.params.nomineeKey);
    if (this.props.params.surveyKey == 'create') {
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

    client.saveSurvey(this.props.nominee.id, profile).then(() => {
      notification.success({title: 'Survey saved!'});
    });
  }

  submitOrgSurvey = (orgName) => {
    return ({ data}) => {
      console.log(orgName, data);
      const profile = { [orgName]: data };
      if (this.props.params.surveyKey) {
        profile.key = this.props.params.surveyKey;
      }
      client.saveSurvey(this.props.nominee.id, profile).then(() => {
        notification.success({title: 'Survey saved!'});
      });
    };
  }

  submitNominee = (nominee) => {
    if (this.props.nominee.id) {
      nominee.key = this.props.nominee.id;
    }

    this.props.actions.saveNominee(nominee);
    notification.success({title: 'Nominee saved!'});
  }

  render = () => {
    const {
      survey,
      surveyOrgModel,
      profile,
      nominee,
      nomineeOrganizations
    } = this.props;

    const model = new ReactSurvey.Model(survey);
    model.onComplete.add(this.submitSurvey);
    model.data = profile;

    const tabs = map(nomineeOrganizations, (org, idx) => (
      <TabPane tab={org} key={idx}>
        <OrganisationForm
          orgName={org}
          orgProfile={profile[org] || {}}
          surveyOrgModel={surveyOrgModel}
          submitOrgSurvey={this.submitOrgSurvey} />
      </TabPane>
    ));

    return (
      <main class="container">
        <h2>Nominee Details</h2>

        <NomineeForm onSubmit={this.submitNominee} nominee={nominee} />

        <hr className="divider" />

        <ReactSurvey.Survey model={model} />

        <hr className="divider" />

        <h2>Organization Details</h2>
        <Tabs defaultActiveKey="0">
          {tabs}
        </Tabs>

      </main>
    );
  }

}

NomineeSurveyPage.propTypes = {
  form: PropTypes.object,
  survey: PropTypes.object,
  surveyOrgModel: PropTypes.object,
  profile: PropTypes.object,
  nominee: PropTypes.object,
  nomineeOrganizations: PropTypes.array
};

const mapStateToProps = (state) => ({
  survey: state.survey,
  surveyOrgModel: state.surveyOrgModel,
  profile: state.profile,
  nominee: state.nominee,
  nomineeOrganizations: state.nomineeOrganizations
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineeSurveyPage);
