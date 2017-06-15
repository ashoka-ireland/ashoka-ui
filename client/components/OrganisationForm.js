import React, { PropTypes } from 'react';
import * as ReactSurvey from 'survey-react';
import 'survey-react/survey.css';

ReactSurvey.Survey.cssType = 'bootstrap';

const OrganisationForm = ({ orgName, surveyOrgModel, orgProfile, submitOrgSurvey }) => {
  const model = new ReactSurvey.Model(surveyOrgModel);
  model.onComplete.add(submitOrgSurvey(orgName));
  model.data = orgProfile;

  return <ReactSurvey.Survey model={model} />;
};

OrganisationForm.propTypes = {
  orgName: PropTypes.string,
  surveyOrgModel: PropTypes.object,
  orgProfile: PropTypes.object,
  submitOrgSurvey: PropTypes.func
};

export default OrganisationForm;
