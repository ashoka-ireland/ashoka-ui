import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Input, Button, Tag } from 'antd';
import { Link, browserHistory } from 'react-router';
import { actions } from '../reducers/nominees/actions';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, record) => <Link to={`/nominees/${record.key}`}>{text}</Link>
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Phone',
  dataIndex: 'primaryDialCode'
}, {
  title: 'Status',
  key: 'status',
  render: (text, record) => {
    if(record.draft) {
      return <Tag color="orange">Draft</Tag>;
    }
    return <Tag color="green">Profile Complete</Tag>;
  }
}, {
  title: 'Interview Status',
  key: 'interview',
  render: () => {
    // TODO: Check if user has a survey
    // count the sections complete using questionnaire import
    return <Tag color="blue">0% complete</Tag>;
  }
}];

class NomineesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  componentWillMount = () => {
    this.props.actions.listNominees();
  }

  search = (event) => {
    const query = event.target.value;
    this.setState({ query }, () => {
      this.props.actions.searchNominees(query);
    });
  }

  onGoNominee = () => {
    browserHistory.push('/nominees/create');
  }

  addOrganization = () => {
    browserHistory.push('/organizations?action=create');
  }

  render = () => {
    const { nomineesPage, nomineesSearchResults } = this.props;
    const { query } = this.state;

    let data;

    if (nomineesSearchResults && nomineesSearchResults.length) {
      data = nomineesSearchResults;
    } else if (query && query.length) {
      data = nomineesSearchResults;
    } else  {
      data = nomineesPage;
    }

    return (
      <main class="container">
        <div class="table-operations">
          <div className="search-row">
            <Input.Search
              className="search-box"
              placeholder="Search nominees..."
              onChange={this.search} />
            <Button type="primary" icon="plus" onClick={this.onGoNominee} >
              Add Nominee
            </Button>
            <Button style={{marginLeft: 10}} type="primary" icon="plus" onClick={this.addOrganization} >
              Add Organization
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={data} />
      </main>
    );
  }
}

NomineesPage.propTypes = {
  nomineesPage: PropTypes.array,
  nomineesSearchResults: PropTypes.array,
  actions: PropTypes.shape({
    listNominees: PropTypes.func.isRequired,
    searchNominees: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => ({
  nomineesPage: state.nomineesPage,
  nomineesSearchResults: state.nomineesSearchResults
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);
