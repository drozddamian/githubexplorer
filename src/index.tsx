import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootStore from './redux/rootStore';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
