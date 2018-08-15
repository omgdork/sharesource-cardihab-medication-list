import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  login,
  setLoggingIn,
  getMedications,
  setMedicationsGetting,
  setErrorMessage,
} from './actions';
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

};

function mapStateToProps(state) {
  return {
    main: state.main,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    setLoggingIn: bindActionCreators(setLoggingIn, dispatch),
    getMedications: bindActionCreators(getMedications, dispatch),
    setMedicationsGetting: bindActionCreators(setMedicationsGetting, dispatch),
    setErrorMessage: bindActionCreators(setErrorMessage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
