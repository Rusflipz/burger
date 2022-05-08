import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer'
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from "react-router-dom";
import socketMiddleware from './services/middleWare/socketMiddleware';
import { wsUrl } from './utils/constants';

// export const store = configureStore({ reducer: rootReducer });
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl))
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
