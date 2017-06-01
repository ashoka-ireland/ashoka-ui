import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/nominees/actions';
import { Link } from 'react-router';
import { Table, Input, Button } from 'antd';

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
  title: 'Country',
  dataIndex: 'countryOfResidence'
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
    this.props.history.push('/nominees/create');
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
      <div>
        <div class="table-operations">
          <div className="search-row">
            <Input
              className="search-box"
              ref={(c) => { this.SearchInput = c; }}
              value={this.state.query}
              placeholder="Search nominees..."
              onChange={this.search} />
            <Button type="primary" icon="user-add" onClick={this.onGoNominee} >
              Add Nominee
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

NomineesPage.propTypes = {
  nomineesPage: PropTypes.array,
  nomineesSearchResults: PropTypes.array,
  actions: PropTypes.shape({
    listNominees: PropTypes.func.isRequired,
    searchNominees: PropTypes.func.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  nomineesPage: state.nomineesPage,
  nomineesSearchResults: state.nomineesSearchResults
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NomineesPage);
