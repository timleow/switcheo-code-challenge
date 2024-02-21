import React from 'react';
import Icon from './Icon';

class CurrencyButton extends React.Component {
  render() {
    const { currencyName, onClick } = this.props;

    return (
      <button className="currencyButton" onClick={onClick}>
        <div className="currencyOption">
          <Icon src={`/tokens/${currencyName}.svg`} alt={currencyName} />
          <span>{currencyName}</span>
        </div>
      </button>
    );
  }
}

export default CurrencyButton;
