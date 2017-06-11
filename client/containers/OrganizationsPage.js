import React, {
  Component,
  PropTypes,
} from 'react';

import { Link, browserHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/organizations/actions';

import { Button, Table, Input } from 'antd';

const columns = [{
  dataIndex: 'name',
  title: 'Name',
  key: 'name',
  render: (text, record) => <Link to={`/organizations/${record.key}?action=edit`}>{text}</Link>
}];

class OrganizationsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      query: ''
    };
  }

  componentWillMount() {
    this.props.actions.listOrganizations();
  }

  addOrganization = () => {
    browserHistory.push('/organizations?action=create');
  };

  onSearch = (evt) => {
    const query = evt.target.value;

    if(!query) return this.componentWillMount();

    this.setState({ query }, () => {
      this.props.actions.searchOrganizations(query);
    });
  };

  render() {
    return (
      <main class="container">
        <div class="table-operations">
          <div className="search-row">
            <Input.Search
              className="search-box"
              placeholder="Search organizations..."
              onChange={this.onSearch}
            />
            <Button type="primary" icon="plus" onClick={this.addOrganization} >
              Add Organization
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={this.props.organizations} />
      </main>
    );
  }
}

OrganizationsPage.propTypes = {
  organizations: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    listOrganizations: PropTypes.func.isRequired,
    searchOrganizations: PropTypes.func.isRequired
  })
};
OrganizationsPage.defaultProps = {};

const mapStateToProps = (state) => ({
  organizations: state.organizations
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsPage);
