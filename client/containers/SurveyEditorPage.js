import React, { Component, PropTypes } from 'react';
import * as SurveyJSEditor from 'surveyjs-editor';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from 'antd';
import client from '../api/client';
import { actions } from '../reducers/surveys/actions';
import 'surveyjs-editor/surveyeditor.css';
import 'bootstrap/dist/css/bootstrap.css';

class SurveyEditorPage extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }

  componentDidMount = () => {
    if(location.pathname.indexOf('survey-org-editor') > -1) {
      this.props.actions.loadSurveyOrgModel();
    } else {
      this.props.actions.loadSurveyModel();
    }
    this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', {});
    this.editor.saveSurveyFunc = this.submitSurveyModel;
  }

  submitSurveyModel = () => {
    let model;
    eval(`model = ${this.editor.text}`);
    console.log(model);
    if (location.pathname.indexOf('survey-org-editor') > -1) {
      client.saveSurveyOrgModel(model).then(() => {
        notification.success({title: 'Survey Org created correctly...'});
      });
    } else {
      client.saveSurveyModel(model).then(() => {
        notification.success({title: 'Survey created correctly...'});
      });
    }
  }

  render = () => {
    const orgModel = location.pathname.indexOf('survey-org-editor') > -1;
    let survey = this.props.survey;
    if (orgModel) {
      survey = this.props.surveyOrgModel;
    }

    if (this.editor) {
      console.log('Render Survey: ', survey);
      this.editor.changeText(JSON.stringify(survey), true);
    }

    return <div id="surveyEditorContainer" />;
  }

}

SurveyEditorPage.propTypes = {
  survey: PropTypes.object,
  surveyOrgModel: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

const mapStateToProps = (state) => ({
  survey: state.survey,
  surveyOrgModel: state.surveyOrgModel
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEditorPage);
