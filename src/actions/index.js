const fetchCurrenciesSuccess = (list) => {
  return {
    type: 'FETCH_CURRENCIES_SUCCESS',
    payload: list,
  };
};

const sumFromChanged = (value) => {
  console.log('from action changed');
  return {
    type: 'SUM_FROM_CHANGED',
    payload: value,
  };
};

const currencyChanged = (obj) => {
  console.log('currencyChanged');
  return {
    type: 'CURRENCY_CHANGED',
    payload: obj,
  };
};
const emailChanged = (str) => {
  console.log('email changed');
  return {
    type: 'EMAIL_CHANGED',
    payload: str,
  };
};

export {
  fetchCurrenciesSuccess,
  sumFromChanged,
  currencyChanged,
  emailChanged,
};
