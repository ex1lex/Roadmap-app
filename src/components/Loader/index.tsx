import React from 'react';
import { Spinner } from 'react-bootstrap';

import './index.scss';

const Loader = () => {
	return (
		<div className="loader">
			<Spinner />
		</div>
	);
};

export default Loader;
