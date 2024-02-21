import React, { useState } from 'react';
import Modal from 'react-modal';
import Icon from './Icon';

class CurrencyModal extends React.Component {
  state = {
    searchTerm: '',
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { isOpen, onClose, currencyOptions, handleSelectCurrency } = this.props;
    const { searchTerm } = this.state;

    const filteredCurrencyOptions = currencyOptions.filter(currencyObj =>
      currencyObj.currency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Select Currency Modal"
        className="modalContent"
        overlayClassName="modalOverlay"
      >
        <div>
          <button className="close" onClick={onClose}>&times;</button>
          <input
            className="searchInput"
            type="text"
            placeholder="Search currency"
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
          {filteredCurrencyOptions.map(currencyObj => (
            <div key={currencyObj.currency} onClick={() => handleSelectCurrency(currencyObj)} className="currencyOption">
              <Icon src={`/tokens/${currencyObj.currency}.svg`} alt={currencyObj.currency} />
              <span>{currencyObj.currency}</span>
            </div>
          ))}
        </div>
      </Modal>
    );
  }
}

export default CurrencyModal;
