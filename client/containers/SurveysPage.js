import React, {
  Component,
  PropTypes,
} from 'react';

import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../reducers/surveys/actions';

import { Button, Table, Input } from 'antd';

const columns = [
  {
    dataIndex: 'key',
    key: 'key',
    title: 'Survey Id'
  },
  {
    dataIndex: 'user.firstName',
    key: 'user.firstName',
    title: 'User',
    render: (text, record) => <Link to={`/users/${record.userId}`}> {text} {record.user.lastName} </Link>
  }
];

class SurveysPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: ''
    };
  }

  componentWillMount() {
    this.props.actions.listSurveys();
  }


  onSearch = (evt) => {
    const query = evt.target.value;

    if(!query) return this.componentWillMount();

    this.setState({ query }, () => {
      // this.props.actions.searchOrganizations(query);
      console.log('Searching surveys by...', query);
    });
  };

  render() {
    return (
      <div>
        <div class="table-operations">
          <div className="search-row">
            <Input.Search
              className="search-box"
              placeholder="Search survey..."
              onChange={this.onSearch}
            />
            <Button type="primary" icon="plus" onClick={this.addOrganization} >
              Add Organization
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={this.props.surveys} />
      </div>
    );
  }
}

SurveysPage.propTypes = {
  surveys: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    listSurveys: PropTypes.func.isRequired,
  })
};

SurveysPage.defaultProps = {};


const mapStateToProps = (state) => ({
  surveys: state.surveys
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveysPage);

