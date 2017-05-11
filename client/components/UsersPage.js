import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, record) => <a href={`/users/${record.key}`}>{text}</a>
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Phone',
  dataIndex: 'primaryDialCode'
}, {
  title: 'Country',
  dataIndex: 'countryOfResidence'
}];

const noop = () => {};

class UsersPage extends Component {
  componentWillMount = () => {
    this.props.actions.listUsers();
  }

  render = () => (
    <div>
      <div className="table-operations">
        <Button onClick={noop}>Sort age</Button>
        <Button onClick={noop}>Clear filters</Button>
        <Button onClick={noop}>Clear filters and sorters</Button>
      </div>
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
