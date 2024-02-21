import React from 'react';
import CurrencyModal from './CurrencyModal'; 
import CurrencyButton from './CurrencyButton';


class CurrencyField extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleSelectCurrency = (currencyObj) => {
    this.props.onChangeCurrency(currencyObj);
    this.toggleModal(); // Close the modal after selecting a currency
  };

  render() {
    const { currencyOptions, selectedCurrency, amount, onChangeAmount } = this.props;
    const { showModal } = this.state;

    // Check if selectedCurrency is defined before accessing its properties
    const selectedCurrencyName = selectedCurrency ? selectedCurrency.currency : "Select Currency";
    const selectedCurrencyPrice = selectedCurrency ? `$${selectedCurrency.price}` : "$0.00";

    return (
      <div className="currencyContainer">
        <div className="inputContainer">
          <input type="number" className="input" value={amount} onChange={onChangeAmount} />
          <div className="inputSubtext">{selectedCurrencyPrice}</div>
        </div>
        <CurrencyButton currencyName={selectedCurrencyName} onClick={this.toggleModal} />
        <CurrencyModal
          isOpen={showModal}
          onClose={this.toggleModal}
          currencyOptions={currencyOptions}
          handleSelectCurrency={this.handleSelectCurrency}
        />
      </div>
    );
  }
}

export default CurrencyField;
