import React, { memo, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm, useFieldArray } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { IItem, INewItem, INewStep } from '../../../../core/types';
import './index.scss';

interface Props {
	isShow: boolean;
	toggle: () => void;
	onSubmit: (item: IItem) => void;
}

const CustomModal = (props: Props) => {
	const { isShow, toggle, onSubmit } = props;

	const {
		control,
		register,
		formState: { errors, isDirty, isValid },
		handleSubmit,
		reset,
	} = useForm<INewItem>({
		defaultValues: {
			name: '',
			about: '',
			tags: [{ name: '' }],
			steps: [{ name: '' }, { name: '' }],
		},
	});
	const tagsSettings = useFieldArray({
		control,
		name: 'tags',
		rules: { minLength: 1, required: true },
	});
	const stepsSettings = useFieldArray({
		control,
		name: 'steps',
		rules: { minLength: 2, required: true },
	});

	const prepareData = (data: INewItem) => {
		const newData: IItem = {
			id: uuid(),
			name: data.name,
			about: data?.about,
			tags: data.tags,
			steps: data.steps.map((step: INewStep) => ({
				id: uuid(),
				isSuccess: false,
				name: step.name,
				steps: data.steps.map((step: INewStep) => ({
					id: uuid(),
					isSuccess: false,
					name: step.name,
				})),
			})),
			createdAt: new Date().toISOString(),
		};

		onSubmit(newData);
	};

	const addNewStepInput = () => stepsSettings.append({ name: '' });
	const addNewTagInput = () => tagsSettings.append({ name: '' });

	useEffect(() => {
		if (!isShow) {
			reset();
		}
		return () => reset();
	}, [reset, isShow]);

	return (
		<Modal centered show={isShow} onHide={toggle}>
			<Modal.Header closeButton>
				<Modal.Title>Create new roadmap</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit(prepareData)}>
				<Modal.Body>
					<div className="custom-modal__body">
						<div className="custom-modal__container">
							<label>Name</label>
							<input
								{...register('name', { required: true })}
								className="custom-modal__input"
								aria-invalid={errors.name ? 'true' : 'false'}
							/>
							{errors.name?.type === 'required' && (
								<p className="custom-modal__error" role="alert">
									Name is required
								</p>
							)}
						</div>
						<div className="custom-modal__container">
							<label>About</label>
							<input
								{...register('about', { required: false })}
								className="custom-modal__input"
								aria-invalid={errors.about ? 'true' : 'false'}
							/>
						</div>
						<div className="custom-modal__container">
							<label>Steps</label>
							{stepsSettings.fields.map((field, index) => {
								const handelRemove = () => stepsSettings.remove(index);
								return (
									<div className="custom-modal__container">
										<div className="custom-modal__container custom-modal__container_type_horizontal">
											<input
												key={field.id} // important to include key with field's id
												{...register(`steps.${index}.name`, {
													required: true,
												})}
												className="custom-modal__input"
												aria-invalid={errors.steps ? 'true' : 'false'}
											/>
											{index > 1 && (
												<Button variant="danger" onClick={handelRemove}>
													Remove
												</Button>
											)}
										</div>
										{errors.steps &&
											errors.steps[index]?.name?.type === 'required' && (
												<p className="custom-modal__error" role="alert">
													Step is required
												</p>
											)}
									</div>
								);
							})}
							{errors.steps?.root?.type === 'minLength' && (
								<p className="custom-modal__error" role="alert">
									Steps is required
								</p>
							)}
							<Button variant="primary" onClick={addNewStepInput}>
								Add step
							</Button>
						</div>
						<div className="custom-modal__container">
							<label>Tags</label>
							{tagsSettings.fields.map((field, index) => {
								const handelRemove = () => tagsSettings.remove(index);
								return (
									<div className="custom-modal__container">
										<div className="custom-modal__container custom-modal__container_type_horizontal">
											<input
												key={field.id}
												{...register(`tags.${index}.name`, {
													required: true,
												})}
												className="custom-modal__input"
												aria-invalid={errors.tags ? 'true' : 'false'}
											/>
											{index > 0 && (
												<Button variant="danger" onClick={handelRemove}>
													Remove
												</Button>
											)}
										</div>
										{errors.tags &&
											errors.tags[index]?.name?.type === 'required' && (
												<p className="custom-modal__error" role="alert">
													Tags is required
												</p>
											)}
									</div>
								);
							})}
							{errors.tags?.root?.type === 'minLength' && (
								<p className="custom-modal__error" role="alert">
									Tags is required
								</p>
							)}
							<Button variant="primary" onClick={addNewTagInput}>
								Add tag
							</Button>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={toggle}>
						Close
					</Button>
					<Button
						variant="primary"
						type="submit"
						disabled={!isDirty || !isValid}
					>
						Create
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default memo(CustomModal);
