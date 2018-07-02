import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import AppContainer from './components/AppContainer';

// styles
import '../node_modules/normalize.css/normalize.css';
import './styles/styles.scss';


ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
