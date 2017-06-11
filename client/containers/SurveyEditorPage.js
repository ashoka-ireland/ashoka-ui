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
    this.props.actions.loadSurveyModel();
    this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', { isAutoSave: true });
    this.editor.saveSurveyFunc = this.submitSurveyModel;
  }

  submitSurveyModel = () => {
    let model;
    eval(`model = ${this.editor.text}`);
    console.log(model);
    client.saveSurveyModel(model).then(() => {
      notification.success({title: 'Survey created correctly...'});
    });
  }

  render = () => {
    if (this.editor) {
      console.log('Render Survey: ', this.props.survey);
      this.editor.changeText(JSON.stringify(this.props.survey), true);
    }

    return <div id="surveyEditorContainer" />;
  }

}

SurveyEditorPage.propTypes = {
  survey: PropTypes.object
};

const mapStateToProps = (state) => ({
  survey: state.survey,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyEditorPage);
