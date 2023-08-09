import { put, takeEvery } from 'redux-saga/effects';
import { setData } from '../reducer';

import { IItem } from '../../../core/types';
import {
	getRoadmaps,
	saveNewRoadmap,
	updateRoadmap,
	removeRoadmap as removeRoadmapById,
} from '../../../api';
import { setLoading } from '../../../core/redux/reducer';
import { ACTIONS } from '../constants';

function* fetchRoadmaps() {
	try {
		yield put(setLoading(true));
		const data: IItem[] = yield getRoadmaps();
		yield put(setData(data));
	} catch (e: any) {
		yield put({ type: 'HOME_ERROR', message: e.message });
		yield put(setData([]));
	} finally {
		yield put(setLoading(false));
	}
}

function* removeRoadmap(action: { type: string; payload: string }) {
	try {
		yield put(setLoading(true));
		yield removeRoadmapById(action.payload);
		const data: IItem[] = yield getRoadmaps();
		yield put(setData(data));
	} catch (e: any) {
		yield put({ type: 'HOME_ERROR', message: e.message });
		yield put(setData([]));
	} finally {
		yield put(setLoading(false));
	}
}

function* changeRoadmap(action: { type: string; payload: IItem }) {
	try {
		yield updateRoadmap(action.payload.id, action.payload);
		const data: IItem[] = yield getRoadmaps();
		yield put(setData(data));
	} catch (e: any) {
		yield put({ type: 'HOME_ERROR', message: e.message });
		yield put(setData([]));
	}
}

function* createRoadmap(action: { type: string; payload: IItem }) {
	try {
		yield put(setLoading(true));
		yield saveNewRoadmap(action.payload);
		const data: IItem[] = yield getRoadmaps();
		yield put(setData(data));
	} catch (e: any) {
		yield put({ type: 'HOME_ERROR', message: e.message });
		yield put(setData([]));
	} finally {
		yield put(setLoading(false));
	}
}

function* homeSaga() {
	yield takeEvery(ACTIONS.FETCH_ROADMAPS, fetchRoadmaps);
	yield takeEvery(ACTIONS.REMOVE_ROADMAP, removeRoadmap);
	yield takeEvery(ACTIONS.CHANGE_ROADMAP, changeRoadmap);
	yield takeEvery(ACTIONS.CREATE_ROADMAP, createRoadmap);
}

export default homeSaga;
