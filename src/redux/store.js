import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';


let middleware = [];
if (process.env.NODE_ENV !== 'production') {
	middleware = [...middleware, createLogger()];
}

export default createStore(reducer, applyMiddleware(thunk, ...middleware));