import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';

class UserPage extends Component {

  componentWillMount = () => {
    if (this.props.params.userKey) {
      this.props.actions.getUser(this.props.params.userKey);
    }
  }

  render = () => (
    <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
