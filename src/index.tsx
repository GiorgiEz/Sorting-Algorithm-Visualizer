import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore} from "redux";
import {sortReducer} from "./Redux/SortReducer";
import {Provider} from "react-redux";

const store = createStore(sortReducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
