import { Form, Button, Row, Tag } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import client from '../api/client';
import { actions } from '../reducers/nominees/actions';
import { NomineeForm } from '../components';

class NomineePage extends Component {

  componentWillMount = () => {
    if (this.props.params.nomineeKey && this.props.params.nomineeKey != 'create') {
      this.props.actions.getNominee(this.props.params.nomineeKey);
    } else {
      // Clear previous nominee
      this.props.actions.getNominee(null);
    }
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

  render = () => (
    <div className="nominee-page">
      <Form>
        <h1>
          Nomination Form
          {
            this.props.nominee.status == 'complete' ?
            <Tag color="green" style={{ marginLeft: 20 }}>Complete</Tag> :
            <Tag color="orange" style={{ marginLeft: 20 }}>Draft</Tag>
          }
        </h1>

        <hr className="divider secondary" />

        <NomineeForm form={this.props.form} requireFields={false} />

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
    </div>
  )
}

NomineePage.propTypes = {
  nominee: PropTypes.object,
  params: PropTypes.shape({
    nomineeKey: PropTypes.string
  }),
  actions: PropTypes.shape({
    getNominee: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  nominee: state.nominee
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields: (props) => mapValues(props.nominee, (value) => ({ value }))
})(NomineePage));
