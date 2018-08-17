import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMedications } from './actions';
import SearchForm from './components/search-form';
import ResultList from './components/result-list';
import MedicationResultList from './components/medication-result-list';

class Main extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      search: {
        username: '',
        password: '',
        medicationList: '',
      },
    };
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

  renderErrorMessage() {
    const errors = Object.values(this.props.main.data.errors).filter((error) => error !== '');

    if (errors.length) {
      return (
        <div className="errors">
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )
    }

    return;
  }

  render() {
    const missing = [];
    const found = [];

    this.props.main.data.medications.forEach((item) => {
      if (item.data.status && item.data.status === 'NOT_FOUND') {
        missing.push(item);
      } else {
        found.push(item);
      }
    });

    return (
      <main>
        <SearchForm onInputChange={this.onInputChange} onSearch={this.onSearch} />
        {this.renderErrorMessage()}
        <ResultList missing={missing.map((item) => item.searchParam)} found={found.map((item) => item.searchParam)} />
        <MedicationResultList missing={missing} found={found} /> 
      </main>
    );
  }
}

Main.propTypes = {
  main: PropTypes.shape({
    data: PropTypes.shape({
      medications: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({
          searchParam: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            displayName: PropTypes.string.isRequired,
            appearance: PropTypes.string.isRequired,
            doseType: PropTypes.string.isRequired,
          })),
        }),
        PropTypes.shape({
          searchParam: PropTypes.string.isRequired,
          data: PropTypes.shape({
            status: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            details: PropTypes.arrayOf(PropTypes.shape({
              errorObject: PropTypes.string.isRequired,
              field: PropTypes.string.isRequired,
              errorValue: PropTypes.string.isRequired,
              message: PropTypes.string.isRequired,
            })).isRequired,
          }).isRequired,
        }),
      ])).isRequired,
      errors: PropTypes.shape({
        login: PropTypes.string.isRequired,
        medications: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    ui: PropTypes.shape({
      isLoggingIn: PropTypes.bool.isRequired,
      isGettingMedications: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  getMedications: PropTypes.func.isRequired,
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
