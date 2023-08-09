import React, { memo, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { IItem, IState } from '../../core/types';
import CustomModal from './components/custom-modal';
import List from './components/list';
import {
	getRoadmaps,
	removeRoadmap,
	saveNewRoadmap,
	updateRoadmap,
} from '../../api';
import { setLoading } from '../../core/redux/reducer';
import './index.scss';

const Home = () => {
	const [items, setItems] = useState<IItem[]>([]);
	const [isShow, setIsShow] = useState<boolean>(false);

	const isLoading = useSelector((state: IState) => state.main.isLoading);
	const dispatch = useDispatch();

	const getData = async () => {
		try {
			dispatch(setLoading(true));
			const data: IItem[] = await getRoadmaps();
			console.log('test1', data);

			setItems(data);
		} catch (error) {
			setItems([]);
		} finally {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		getData();
		return () => setItems([]);
	}, []);

	const onSubmit = async (newItem: IItem) => {
		await saveNewRoadmap(newItem);
		toggleModal();
		await getData();
	};

	const toggleModal = () => setIsShow(!isShow);

	const onItemChange = async (newItem: IItem) => {
		await updateRoadmap(newItem.id, newItem);
		setItems(
			items.map((item) => {
				if (item.id === newItem.id) {
					return newItem;
				}
				return item;
			}),
		);
	};

	const onItemRemove = async (itemId: string) => {
		await removeRoadmap(itemId);
		setItems(items.filter((item) => item.id !== itemId));
	};

	const isEmptyList = items.length === 0;

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
				items={items}
				toggle={toggleModal}
			/>
			<CustomModal onSubmit={onSubmit} isShow={isShow} toggle={toggleModal} />
		</div>
	);
};

export default memo(Home);
