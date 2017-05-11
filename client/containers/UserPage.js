import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';

class UserPage extends Component {

  render = () => (
    <div>
    </div>
  )
}

UserPage.propTypes = {
  actions: PropTypes.shape({
    getUser: PropTypes.func.isRequired
  })
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
