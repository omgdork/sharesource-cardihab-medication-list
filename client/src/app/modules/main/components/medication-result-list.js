import React from 'react';
import PropTypes from 'prop-types';
import MedicationResultListItem from './medication-result-list-item';

const MedicationResultList = ({ missing, found }) => (
  <section className="medication-result container">
    <h2>Medication Result</h2>
    <ul>
      {missing.map((item, i) => missingTemplate(item, i))}
      {found.map((item, i) => foundTemplate(item, i))}
    </ul>
  </section>
);

function missingTemplate(item, key) {
  return (
    <MedicationResultListItem key={key} canShowItems={false}>
      <span className="medication-name">
        {item.details[0].errorValue}
        <span className="medication-count none">0</span>
      </span>
    </MedicationResultListItem>
  );
}

function foundTemplate(item, key) {
  return (
    <MedicationResultListItem key={key}>
      <span className="medication-name">
        {item.searchParam}
        <span className="medication-count">{item.data.length}</span>
      </span>
      <ul>
        {item.data.map((entry, i) => (
          <li key={i}>
            {entry.displayName}
            <br />
            {entry.id}
            <br />
            {entry.appearance}
          </li>
        ))}
      </ul>
    </MedicationResultListItem>
  );
}

MedicationResultList.propTypes = {
  missing: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  found: PropTypes.arrayOf(PropTypes.shape({
    searchParam: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      appearance: PropTypes.string.isRequired,
      doseType: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default MedicationResultList;
