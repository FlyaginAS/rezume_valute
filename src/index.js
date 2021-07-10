import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import App from './components/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import ApiService from './services';
import ApiContext from './components/api-service-context/';
import store from './store';

const apiService = new ApiService();

ReactDOM.render(
  /**This is my typical project structure
   * somewhere I could leave unused code from my
   * old typical project - do not be offended
   * делать тестовое в 30 градусов- то еще удовольствие ))
   */
  <Provider store={store}>
    <ErrorBoundry>
      <ApiContext.Provider value={apiService}>
        <Router>
          <App />
        </Router>
      </ApiContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.querySelector('#root')
);
