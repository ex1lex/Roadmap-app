import React, { memo } from 'react';
import { ProgressBar, Accordion, Button, Badge } from 'react-bootstrap';

import { IItem } from '../../../../../../core/types';
import Steps from './components/steps';
import './index.scss';

interface Props {
	item: IItem;
	onItemChange: (newItem: IItem) => void;
	onItemRemove: (itemId: string) => void;
}

const Item = (props: Props) => {
	const { item, onItemChange, onItemRemove } = props;

	const successCount = item.steps.filter((step) => step.isSuccess).length;
	const now = Math.round((successCount / item.steps.length) * 100) || 0;

	const handleStepClick = (stepId: string) => {
		const newItem = {
			...item,
			steps: item.steps.map((step) => {
				if (step.id === stepId) {
					return {
						...step,
						isSuccess: !step.isSuccess,
					};
				}
				return step;
			}),
		};
		onItemChange(newItem);
	};

	const handleItemRemove = () => onItemRemove(item.id);

	const createdAt = new Date(item.createdAt).toLocaleDateString();

	return (
		<li className="item">
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<div className="item__header">
							<div className="item__header-container">
								<h4 className="item__title">{item.name}</h4>
								<ProgressBar
									variant={now === 100 ? 'success' : 'primary'}
									className="item__progress"
									now={now}
									label={`${now}%`}
								/>
								<Button
									className="item__btn"
									variant="danger"
									onClick={handleItemRemove}
								>
									Remove
								</Button>
							</div>
							<div className="item__header-container">
								<p className="item__header-date">{createdAt}</p>
								<div className="item__tags">
									{item.tags.map((tag) => (
										<Badge bg="primary">{tag.name}</Badge>
									))}
								</div>
							</div>
						</div>
					</Accordion.Header>
					<Accordion.Body>
						{item?.about}
						<Steps steps={item.steps} onStepClick={handleStepClick} />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</li>
	);
};

export default memo(Item);
