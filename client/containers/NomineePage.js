import { Form, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import client from '../api/client';
import { actions } from '../reducers/nominees/actions';
import { NomineeForm } from '../components';

class NomineePage extends Component {

  componentWillMount = () => {
    if (this.props.params.nomineeKey) {
      this.props.actions.getNominee(this.props.params.nomineeKey);
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const updatedNominee = Object.assign({}, this.props.nominee, values);
        client.createNominee(updatedNominee);
      }
    });
  }

  render = () => (
    <div className="nominee-page">
      <Form>
        <hr className="divider secondary" />

        <NomineeForm form={this.props.form} />

        <hr className="divider secondary" />

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
