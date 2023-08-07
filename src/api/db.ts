import { ref, set, onValue, update, remove } from 'firebase/database';
import { database } from './firebase';

import { IItem } from '../core/types';

export const getRoadmaps = async () =>
	await new Promise<IItem[]>((resolve) => {
		onValue(
			ref(database, 'roadmaps'),
			(snapshot) => {
				const data = snapshot.val();
				const arr: IItem[] = [];
				if (data) {
					Object.keys(data)?.forEach((key) => {
						const item = {
							id: key,
							...data[key],
						};
						arr.push(item);
					});
				}
				resolve(arr);
			},
			{
				onlyOnce: true,
			},
		);
	});

export const getRoadmapById = async (id: string) =>
	await new Promise<IItem>((resolve) => {
		onValue(
			ref(database, `roadmaps/${id}`),
			(snapshot) => {
				const data = snapshot.val();
				resolve(data);
			},
			{
				onlyOnce: true,
			},
		);
	});

export const saveNewRoadmap = async (item: IItem) =>
	await set(ref(database, `roadmaps/${item.id}`), item);

export const updateRoadmap = async (id: string, item: IItem) => {
	await update(ref(database, 'roadmaps'), {
		[`/${id}/`]: item,
	});
};

export const removeRoadmap = async (id: string) => {
	console.log('test????', id);

	await remove(ref(database, `roadmaps/${id}`));
};
