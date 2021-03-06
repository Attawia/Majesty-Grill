import react from 'react';
import './index.css';
import reactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

reactDOM.render(
<Provider store={store}>
    <App/>
</Provider>,
 document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
