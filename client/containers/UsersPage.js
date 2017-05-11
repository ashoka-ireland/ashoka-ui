import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';
import { Link } from 'react-router';
import { Table } from 'antd';

const columns = [{
  title: 'First Name',
  dataIndex: 'firstName',
  render: (text, record) => <Link to={`/users/${record.key}`}>{text}</Link>
},{
  title: 'Last Name',
  dataIndex: 'lastName',
},{
  title: 'Email',
  dataIndex: 'email',
}];

class UsersPage extends Component {

  componentWillMount = () => {
    this.props.actions.listUsers();
  }

  render = () => (
    <div>
      <Table columns={columns} dataSource={this.props.usersPage} />
    </div>
  )
}

UsersPage.propTypes = {
  usersPage: PropTypes.array,
  actions: PropTypes.shape({
    listUsers: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  usersPage: state.usersPage
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
