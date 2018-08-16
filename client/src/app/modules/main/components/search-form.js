import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      username: '',
      password: '',
      medicationList: '',
    };
  }

  onInputChange(e) {
    const field = {};
    const { name, value } = e.target;

    field[name] = value;
    
    this.setState({
      ...field,
    }, () => {
      this.props.onInputChange(field);
    });
  }

  render() {
    return (
      <section className="medication-search container">
        <h2>Medication Search</h2>
        <form>
          <div className="field">
            <label htmlFor="txt-username">Username</label>
            <input id="txt-username" type="text" name="username" onChange={this.onInputChange} />
          </div>
          <div className="field">
            <label htmlFor="txt-password">Password</label>
            <input id="txt-password" type="password" name="password" onChange={this.onInputChange} />
          </div>
          <div className="field">
            <textarea id="txt-medication-list" name="medicationList" onChange={this.onInputChange}></textarea>
          </div>
          <div className="buttons-container">
            <button type="button" className="btn" onClick={this.props.onSearch} disabled={Object.values(this.state).some((field) => field === '')}>Search</button>
          </div>
        </form>
      </section>
    );
  }
}

SearchForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
