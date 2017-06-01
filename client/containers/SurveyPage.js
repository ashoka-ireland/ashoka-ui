import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Form, Progress, Button, notification } from 'antd';
import client from '../api/client';
import { buildSurvey } from '../lib/survey/builder';

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

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        client.createNominee(values).then(() => {
          notification.success({title: 'Survey created correctly...'});
          browserHistory.push('/surveys');
        });
      }
    });
  }

  render = () => (
    <div class="home-page">
      <h1 class="text-center">Ashoka Changemaker Questionnaire</h1>
      <br />
      <hr class="divider"/>
      <h2 class="slogan"><Progress percent={30}/></h2>

      <Form>

        { buildSurvey(formItemLayout, this.props.form) }

        <hr className="divider" />

        <Button type="primary"
                htmlType="submit"
                onClick={this.submit}
                size="large">
          Submit
        </Button>
      </Form>

    </div>
  )
}

SurveyPage.propTypes = {
  form: PropTypes.object
};

export default Form.create()(SurveyPage);
