import React, { memo, useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { IItem } from '../../core/types';
import CustomModal from './components/custom-modal';
import List from './components/list';
import { AppDispatch, RootState } from '../../core/redux';
import { setData } from './reducer';
import { ACTIONS } from './constants';
import './index.scss';

const Home = () => {
	const [isShow, setIsShow] = useState<boolean>(false);

	const isLoading = useSelector((state: RootState) => state.main.isLoading);
	const data = useSelector((state: RootState) => state.home.data);
	const dispatch: AppDispatch = useDispatch();

	const toggleModal = () => setIsShow(!isShow);

	const isEmptyList = data.length === 0;

	const getData = useCallback(() => {
		dispatch({ type: ACTIONS.FETCH_ROADMAPS });
	}, [dispatch]);

	const onSubmit = (newItem: IItem) => {
		dispatch({ type: ACTIONS.CREATE_ROADMAP, payload: newItem });
		toggleModal();
	};

	const onItemChange = (newItem: IItem) => {
		dispatch({ type: ACTIONS.CHANGE_ROADMAP, payload: newItem });
	};

	const onItemRemove = (itemId: string) => {
		dispatch({ type: ACTIONS.REMOVE_ROADMAP, payload: itemId });
	};

	useEffect(() => {
		getData();
		return () => {
			dispatch(setData([]));
		};
	}, [dispatch, getData]);

	return (
		<div className="home">
			<header className="home__header">
				<h1 className="home__title">Roadmap</h1>
				<div className="home__actions">
					{!isEmptyList && (
						<Button className="home__btn" onClick={toggleModal}>
							Create
						</Button>
					)}
				</div>
			</header>
			<List
				isLoading={isLoading}
				onItemRemove={onItemRemove}
				onItemChange={onItemChange}
				items={data}
				toggle={toggleModal}
			/>
			<CustomModal onSubmit={onSubmit} isShow={isShow} toggle={toggleModal} />
		</div>
	);
};

export default memo(Home);
