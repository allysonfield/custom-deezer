import { all, takeLatest, call, put } from 'redux-saga/effects';
import { setTracks } from './action';
import api from '~/services/api';

export function* searchRequest({ payload }) {
  try {
    const { key } = payload;

    // login da conta
    const { data } = yield call(() => api.get(`search?q=${key}`));
    console.log(data.data[0]);
    yield put(setTracks({ tracks: data.data }));
  } catch (error) {
    console.log({ error });
  }
}

export default all([takeLatest('@auth/SET_DATA_REQUEST', searchRequest)]);
