import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MedicationResultListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      isShown: false,
    };
  }

  onClick() {
    this.setState({
      isShown: !this.state.isShown,
    })
  }

  render() {
    return (
      <li className={this.props.canShowItems && this.state.isShown ? 'shown' : ''} onClick={this.onClick}>
        {this.props.children}
      </li>
    );
  }
}

MedicationResultListItem.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
  ]).isRequired,
  canShowItems: PropTypes.bool.isRequired,
};

MedicationResultListItem.defaultProps = {
  canShowItems: true,
};

export default MedicationResultListItem;
