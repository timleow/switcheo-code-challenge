import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyField from './CurrencyField';
import CustomAlert from './CustomAlert';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal component
import { GoArrowSwitch } from "react-icons/go";
import { BiMoney } from "react-icons/bi";

const TOKEN_PRICE_URL = "https://interview.switcheo.com/prices.json";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for managing the confirmation modal

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(TOKEN_PRICE_URL)
      .then(res => res.json())
      .then(data => {
        const currencyMap = new Map();
        data.forEach(currencyObj => {
          if (!currencyMap.has(currencyObj.currency) || 
              currencyObj.date > currencyMap.get(currencyObj.currency).date) {
            currencyMap.set(currencyObj.currency, currencyObj);
          }
        });
        const uniqueCurrencyOptions = Array.from(currencyMap.values());
        setCurrencyOptions(uniqueCurrencyOptions);
        const firstCurrency = uniqueCurrencyOptions[0];
        setFromCurrency(firstCurrency);
        setToCurrency(firstCurrency);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      setExchangeRate(fromCurrency.price / toCurrency.price);
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleFromCurrencyChange(currency) {
    setFromCurrency(currency);
  }

  function handleToCurrencyChange(currency) {
    setToCurrency(currency);
  }

  function handleSwapCurrency() {
    if (toCurrency === fromCurrency) {
      setShowAlert(true);
      return;
    }
    setShowConfirmationModal(true); // Open the confirmation modal
  }

  function handleConfirmSwap() {
    setShowConfirmationModal(false); // Close the confirmation modal
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div>
      <div className="title">
        <BiMoney className="money-icon" />
        <h1>Currency Swapper</h1>
      </div>
      <div className="form">
        <CurrencyField 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleFromCurrencyChange}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <button className="swapButton" onClick={handleSwapCurrency}>
          <GoArrowSwitch className="switch-icon" />
        </button>

        <CurrencyField 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={handleToCurrencyChange}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
        {showAlert && (
          <CustomAlert
            message="The currencies are the same."
            onClose={() => setShowAlert(false)}
          />
        )}
        {showConfirmationModal && (
          <ConfirmationModal
            isOpen={showConfirmationModal}
            onCancel={() => setShowConfirmationModal(false)}
            onConfirm={handleConfirmSwap}
          />
        )}
      </div>
      <button className="swapButton" onClick={() => setShowConfirmationModal(true)}>
          Confirm Swap
        </button>
    </div>
  );
}

export default App;