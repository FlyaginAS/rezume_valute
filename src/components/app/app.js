import React, { useContext, useEffect } from 'react';
import ApiContext from '../api-service-context';
import { send } from 'emailjs-com';

import {
  fetchCurrenciesSuccess,
  sumFromChanged,
  currencyChanged,
  emailChanged,
} from '../../actions';

import './app.scss';
import { connect } from 'react-redux';

/**I will use Redux for saving state and
 *  HOC function 'connect' to connect our App to Redux.
 * and Hooks for other purposes */

//я не стал разбивать обменник на мелкие компоненты. все написал в App.
const App = ({
  list,
  currentCurrency,
  sumFrom,
  sumTo,
  email,
  fetchCurrenciesSuccess,
  sumFromChanged,
  currencyChanged,
  emailChanged,
}) => {
  const apiService = useContext(ApiContext);
  //комментировать последующий код не вижу смысла
  useEffect(() => {
    apiService
      .getListCurrencies()
      .then((list) => {
        fetchCurrenciesSuccess(Object.values(list.Valute));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /**todo  */

  //Uses emailjs for sending emails********************************
  const obj = {
    from_name: 'Alexander Flyagin',
    to_name: 'US Studio',
    message: `Сумма в рублях: ${sumFrom}, Валюта для конвертации: ${currentCurrency.Name}, Сумма в валюте: ${sumTo}`,
    reply_to: 'krastschenko@rambler.ru',
  };
  //krastschenko@rambler.ru
  const onSubmit = (e) => {
    e.preventDefault();

    send(
      'service_8opndfk', //service id
      'template_emos05t',
      obj, //obj with email details
      'user_zCEKoMhyXdALjf51vQtT2' //your user id
    ).then(
      (result) => {
        console.log('Отправлено');
        alert(
          `Отправлено на мою почту. Чтобы отправить на вашу необходимо
           писать бэк с Nodemailer. Отправленные данные Сумма в рублях:${sumFrom}, Валюта для конвертации: ${currentCurrency.Name},
             Сумма в валюте: ${sumTo}`
        );
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  /*************************************************************** */
  const listEl = list.map((obj) => {
    return (
      <option
        className="currency-converter__option"
        value=""
        onClick={() => currencyChanged(obj)}
        key={obj.Name}
      >
        {obj.Name}
      </option>
    );
  });

  return (
    <form onSubmit={onSubmit} className="currency-converter">
      <input
        className="currency-converter__sum-from"
        type="number"
        placeholder="Сумма, руб"
        value={sumFrom}
        min="1"
        onChange={(evt) => sumFromChanged(evt.target.value)}
      />

      <select
        className="currency-converter__select"
        name="currencies"
        id="currencies"
      >
        {listEl}
      </select>
      <input
        className="currency-converter__sum-to"
        type="text"
        placeholder="Сумма в валюте"
        value={sumTo}
        readOnly
      />
      <input
        className="currency-converter__email"
        type="email"
        placeholder="E-mail"
        required
        value={email}
        onChange={(evt) => emailChanged(evt.target.value)}
      />
      <button className="currency-converter__send-mail" type="submit">
        Записаться на обмен валюты
      </button>
    </form>
  );
};

const mapStateToProps = ({
  app: { list, currentCurrency, sumFrom, sumTo, email },
}) => {
  return {
    list,
    currentCurrency,
    sumFrom,
    sumTo,
    email,
  };
};

const mapDispatchToProps = {
  fetchCurrenciesSuccess,
  sumFromChanged,
  currencyChanged,
  emailChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
