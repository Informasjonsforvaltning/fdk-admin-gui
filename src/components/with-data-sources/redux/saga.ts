import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  HARVEST_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_REQUESTED,
  UPDATE_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_REQUESTED
} from './action-types';

import { DataSource } from '../../../types';

const { FDK_HARVEST_ADMIN_HOST } = env;

function* fetchDataSourcesRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources`,
      {
        headers: {
          authorization
        }
      }
    );
    if (Array.isArray(data)) {
      yield put(actions.fetchDataSourcesSucceeded(data as DataSource[]));
    } else {
      yield put(actions.fetchDataSourcesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchDataSourcesFailed(e.message));
  }
}

function* harvestDataSourceRequested({
  payload: { id }
}: ReturnType<typeof actions.harvestDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { message, status } = yield call(
      axios.post,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources/${id}`,
      {},
      {
        headers: {
          authorization
        }
      }
    );
    if (status === 204) {
      yield put(actions.harvestDataSourceSucceeded());
    } else {
      yield put(actions.harvestDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.harvestDataSourceFailed(e.message));
  }
}

function* registerDataSourceRequested({
  payload: { dataSource }
}: ReturnType<typeof actions.registerDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { headers, message, status } = yield call(
      axios.post,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources`,
      dataSource,
      {
        headers: {
          authorization
        }
      }
    );
    if (status === 201) {
      yield put(
        actions.registerDataSourceSucceeded({
          ...dataSource,
          id: headers.location
        } as DataSource)
      );
    } else {
      yield put(actions.registerDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.registerDataSourceFailed(e.message));
  }
}

function* updateDataSourceRequested({
  payload: {
    dataSource: { id, ...dataSourceData }
  }
}: ReturnType<typeof actions.updateDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message, status } = yield call(
      axios.put,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources/${id}`,
      dataSourceData,
      {
        headers: {
          authorization
        }
      }
    );
    if (status === 200) {
      yield put(
        actions.updateDataSourceSucceeded({
          id,
          ...data
        } as DataSource)
      );
    } else {
      yield put(actions.updateDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.updateDataSourceFailed(e.message));
  }
}

function* removeDataSourceRequested({
  payload: { id }
}: ReturnType<typeof actions.removeDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { message, status } = yield call(
      axios.delete,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources/${id}`,
      {
        headers: {
          authorization
        }
      }
    );
    if (status === 204) {
      yield put(actions.removeDataSourceSucceeded(id));
    } else {
      yield put(actions.removeDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.removeDataSourceFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_DATA_SOURCES_REQUESTED, fetchDataSourcesRequested),
    takeLatest(HARVEST_DATA_SOURCE_REQUESTED, harvestDataSourceRequested),
    takeLatest(REGISTER_DATA_SOURCE_REQUESTED, registerDataSourceRequested),
    takeLatest(UPDATE_DATA_SOURCE_REQUESTED, updateDataSourceRequested),
    takeLatest(REMOVE_DATA_SOURCE_REQUESTED, removeDataSourceRequested)
  ]);
}
