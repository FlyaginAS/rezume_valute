const updateApp = (state, action) => {
  if (state === undefined) {
    return {
      list: [],
      currentCurrency: {},
      sumFrom: '',
      sumTo: '',
      email: '',
    };
  }

  //functions*********************************************
  const calculateSumTo = (sumFrom, value) => {
    return (sumFrom / value).toFixed(2);
  };
  //end of functions*********************************************

  switch (action.type) {
    case 'FETCH_CURRENCIES_SUCCESS':
      return {
        ...state.app,
        list: action.payload,
        currentCurrency: action.payload[0],
      };
    case 'SUM_FROM_CHANGED':
      return {
        ...state.app,
        sumFrom: action.payload,
        sumTo: calculateSumTo(
          action.payload,
          state.app.currentCurrency.Value
        ),
      };
    case 'CURRENCY_CHANGED':
      return {
        ...state.app,
        currentCurrency: action.payload,
        sumTo: calculateSumTo(
          state.app.sumFrom,
          action.payload.Value
        ),
      };
    case 'EMAIL_CHANGED':
      return {
        ...state.app,
        email: action.payload,
      };

    default:
      return state.app;
  }
};
export default updateApp;
