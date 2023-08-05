import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import { ROUTES } from './constants';

const Routing = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Home />} />
		</Routes>
	);
};

export default Routing;
