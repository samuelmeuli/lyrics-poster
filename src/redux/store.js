import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';


let middleware = [];
if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, createLogger()];
}

export default createStore(reducer, applyMiddleware(...middleware));
