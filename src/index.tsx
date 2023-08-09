import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/base/index.scss';
import Routing from './core/routes';
import { store } from './core/redux';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<ToastContainer />
		<BrowserRouter>
			<Provider store={store}>
				<Routing />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
