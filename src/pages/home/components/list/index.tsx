import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';

import { IItem } from '../../../../core/types';
import Item from './components/item';
import Loader from '../../../../components/Loader';
import './index.scss';

interface Props {
	isLoading: boolean;
	items: IItem[];
	toggle: () => void;
	onItemChange: (newItem: IItem) => void;
	onItemRemove: (itemId: string) => void;
}

const List = (props: Props) => {
	const { items, onItemChange, toggle, onItemRemove, isLoading } = props;

	const isEmptyList = items.length === 0;

	if (isLoading) return <Loader />;

	if (isEmptyList) {
		return (
			<div className="list">
				<div className="list__empty-container">
					<h4 className="list__title">
						The list is empty. Create new roadmap.
					</h4>
					<Button className="home__btn" onClick={toggle}>
						Create
					</Button>
				</div>
			</div>
		);
	}

	return (
		<ul className="list">
			{items.map((item) => (
				<Item
					onItemRemove={onItemRemove}
					onItemChange={onItemChange}
					key={item.id}
					item={item}
				/>
			))}
		</ul>
	);
};

export default memo(List);
