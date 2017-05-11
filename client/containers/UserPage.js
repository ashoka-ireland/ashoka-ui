import { Form, Button } from 'antd';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import client from '../api/client';
import { actions } from '../reducers/users/actions';
import { UserForm } from '../components';

class UserPage extends Component {

  componentWillMount = () => {
    if (this.props.params.userKey) {
      this.props.actions.getUser(this.props.params.userKey);
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const updatedUser = Object.assign({}, this.props.user, values);
        client.createUser(updatedUser);
      }
    });
  }

  render = () => (
    <div className="user-page">
      <Form>
        <hr className="divider secondary" />

        <UserForm form={this.props.form} />

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

UserPage.propTypes = {
  user: PropTypes.object,
  params: PropTypes.shape({
    userKey: PropTypes.string
  }),
  actions: PropTypes.shape({
    getUser: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields: (props) => mapValues(props.user, (value) => ({ value }))
})(UserPage));
