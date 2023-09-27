import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
