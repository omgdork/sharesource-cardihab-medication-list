import React from 'react';
import PropTypes from 'prop-types';

const ResultList = ({ missing, found }) => (
  <section className="result container">
    <h2>Result List</h2>
    <div className="items">
      <fieldset className="missing">
        <legend>{missing.length} Missing</legend>
        <ul>
          {missing.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </fieldset>
      <fieldset className="found">
        <legend>{found.length} Found</legend>
        <ul>
          {found.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </fieldset>
    </div>
  </section>
);

ResultList.propTypes = {
  missing: PropTypes.arrayOf(PropTypes.string).isRequired,
  found: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ResultList;
