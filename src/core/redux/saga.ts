import { all } from 'redux-saga/effects';

import homeSaga from '../../pages/home/saga/saga';

export default function* rootSaga() {
	yield all([homeSaga()]);
}
