import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/users/actions';
import { Link } from 'react-router';
import { Table, Input, Row } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, record) => <Link to={`/users/${record.key}`}>{text}</Link>
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

class UsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  componentWillMount = () => {
    this.props.actions.listUsers();
  }

  search = (event) => {
    const query = event.target.value;

    this.setState({ query }, () => {
      this.props.actions.searchUsers(query);
    });
  }

  render = () => {
    const { usersPage, usersSearchResults } = this.props;
    const { query } = this.state;

    let data;

    if (usersSearchResults && usersSearchResults.length) {
      data = usersSearchResults;
    } else if (query && query.length) {
      data = usersSearchResults;
    } else  {
      data = usersPage;
    }

    return (
      <div>
        <div class="table-operations">
          <Row type="flex" justify="end">
            <Input
              ref={(c) => { this.SearchInput = c; }}
              value={this.state.query}
              placeholder="Search users..."
              onChange={this.search} />
          </Row>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  usersPage: PropTypes.array,
  usersSearchResults: PropTypes.array,
  actions: PropTypes.shape({
    listUsers: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  usersPage: state.usersPage,
  usersSearchResults: state.usersSearchResults
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
