import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// styles
import '../node_modules/normalize.css/normalize.css';
import './styles/styles.css';


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();