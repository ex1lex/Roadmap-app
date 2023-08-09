import React, { memo } from 'react';
import classNames from 'classnames';

import { IStep } from '../../../../../../../../core/types';
import './index.scss';

interface Props {
	steps: IStep[];
	onStepClick: (stepId: string) => void;
}

const Steps = (props: Props) => {
	const { steps, onStepClick } = props;

	return (
		<ul className="steps">
			{steps.map((step) => {
				const handleStepClick = () => onStepClick(step.id);
				return (
					<li
						key={step.id}
						className={classNames('steps__step', {
							steps__step_type_success: step.isSuccess,
						})}
					>
						<button className="steps__check" onClick={handleStepClick} />
						<h4 className="steps__title">{step.name}</h4>
					</li>
				);
			})}
		</ul>
	);
};

export default memo(Steps);
