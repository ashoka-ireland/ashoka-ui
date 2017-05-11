import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';
import { Table, Button } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Phone',
  dataIndex: 'phone',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Ashoka Project ${i}`,
    email: 'ashokasocialapi@gmail.com',
    phone: '12345678'
  });
}

const noop = () => {};

class UsersPage extends Component {

  componentWillMount = () => {
    this.props.actions.listUsers();
  }

  render() {
    console.log(this.props.usersPage);
    return (
      <div>
        <div className="table-operations">
          <Button onClick={noop}>Sort age</Button>
          <Button onClick={noop}>Clear filters</Button>
          <Button onClick={noop}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  usersPage: PropTypes.object,
  actions: PropTypes.shape({
    listUsers: PropTypes.func.isRequired
  })
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
