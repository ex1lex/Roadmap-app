import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import './styles/base/index.scss';
import Routing from './core/routes';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<ToastContainer />
		<BrowserRouter>
			<Routing />
		</BrowserRouter>
	</React.StrictMode>,
);
