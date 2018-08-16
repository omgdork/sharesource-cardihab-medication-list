import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMedications } from './actions';
import SearchForm from './components/search-form';

class Main extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      search: {
        username: '',
        password: '',
        medicationList: '',
      }
    }
  }

  onInputChange(field) {
    this.setState({
      search: {
        ...this.state.search,
        ...field,
      },
    });
  }

  onSearch() {
    this.props.getMedications(this.state.search.username, this.state.search.password, this.state.search.medicationList);
  }

  render() {
    return (
      <div>
        <SearchForm onInputChange={this.onInputChange} onSearch={this.onSearch} />
      </div>
    );
  }
}

Main.propTypes = {
  data: PropTypes.shape({
    medications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      appearance: PropTypes.string.isRequired,
      doseType: PropTypes.string.isRequired,
    })).isRequired,
    errors: PropTypes.shape({
      login: PropTypes.string.isRequired,
      medications: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  ui: PropTypes.shape({
    isLoggingIn: PropTypes.bool.isRequired,
    isGettingMedications: PropTypes.bool.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    main: state.main,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMedications: bindActionCreators(getMedications, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
