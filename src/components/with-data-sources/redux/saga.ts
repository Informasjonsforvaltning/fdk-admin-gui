import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  HARVEST_DATA_SOURCE_REQUESTED,
  HARVEST_STATUS_REQUESTED,
  REGISTER_DATA_SOURCE_REQUESTED,
  UPDATE_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_REQUESTED
} from './action-types';

import { DataSource, HarvestCurrentState } from '../../../types';

const { FDK_HARVEST_ADMIN_HOST } = env;

function* fetchStatusForDataSource(
  authorization: string,
  dataSource: DataSource
) {
  try {
    const { id, publisherId } = dataSource;
    const { data, status } = yield call(
      axios.get,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${publisherId}/datasources/${id}/status`,
      {
        headers: { authorization }
      }
    );
    if (status === 200 && Array.isArray(data)) {
      yield put(
        actions.fetchDataSourceStatusSucceeded(
          id,
          data as HarvestCurrentState[]
        )
      );
    }
  } catch {
    // Silently ignore per-datasource failures; status will remain undefined
  }
}

function* fetchStatusesForDataSources(
  authorization: string,
  dataSources: DataSource[]
) {
  yield all(
    dataSources.map((ds: DataSource) =>
      call(fetchStatusForDataSource, authorization, ds)
    )
  );
}

function* fetchDataSourcesRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${FDK_HARVEST_ADMIN_HOST}/datasources`,
      {
        headers: {
          authorization
        }
      }
    );
    if (Array.isArray(data)) {
      const dataSources = data as DataSource[];
      yield put(actions.fetchDataSourcesSucceeded(dataSources));
      yield* fetchStatusesForDataSources(authorization, dataSources);
    } else {
      yield put(actions.fetchDataSourcesFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.fetchDataSourcesFailed(e.message));
  }
}

function* harvestDataSourceRequested({
  payload: { id, org, removeAll, forced }
}: ReturnType<typeof actions.harvestDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { message, status } = yield call(
      axios.post,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${org}/datasources/${id}/start-harvesting`,
      {
        removeAll: removeAll ?? false,
        forced: forced ?? false
      },
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
  } catch (e: any) {
    yield put(actions.harvestDataSourceFailed(e.message));
  }
}

function* registerDataSourceRequested({
  payload: { dataSource }
}: ReturnType<typeof actions.registerDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message, status } = yield call(
      axios.post,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${dataSource.publisherId}/datasources`,
      dataSource,
      {
        headers: {
          authorization
        }
      }
    );
    if (status === 201) {
      yield put(actions.registerDataSourceSucceeded(data as DataSource));
    } else {
      yield put(actions.registerDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.registerDataSourceFailed(e.message));
  }
}

function* updateDataSourceRequested({
  payload: {
    org,
    dataSource: { id, ...dataSourceData }
  }
}: ReturnType<typeof actions.updateDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message, status } = yield call(
      axios.put,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${org}/datasources/${id}`,
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
  } catch (e: any) {
    yield put(actions.updateDataSourceFailed(e.message));
  }
}

function* removeDataSourceRequested({
  payload: { id, org }
}: ReturnType<typeof actions.removeDataSourceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { message, status } = yield call(
      axios.delete,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${org}/datasources/${id}`,
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
  } catch (e: any) {
    yield put(actions.removeDataSourceFailed(e.message));
  }
}

function* harvestStatusRequested({
  payload: { id, org }
}: ReturnType<typeof actions.harvestStatusRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message, status } = yield call(
      axios.get,
      `${FDK_HARVEST_ADMIN_HOST}/organizations/${org}/datasources/${id}/status`,
      {
        headers: { authorization }
      }
    );
    if (status === 200 && Array.isArray(data)) {
      yield put(
        actions.harvestStatusSucceeded(id, data as HarvestCurrentState[])
      );
    } else {
      yield put(actions.harvestStatusFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.harvestStatusFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_DATA_SOURCES_REQUESTED, fetchDataSourcesRequested),
    takeLatest(HARVEST_DATA_SOURCE_REQUESTED, harvestDataSourceRequested),
    takeLatest(HARVEST_STATUS_REQUESTED, harvestStatusRequested),
    takeLatest(REGISTER_DATA_SOURCE_REQUESTED, registerDataSourceRequested),
    takeLatest(UPDATE_DATA_SOURCE_REQUESTED, updateDataSourceRequested),
    takeLatest(REMOVE_DATA_SOURCE_REQUESTED, removeDataSourceRequested)
  ]);
}
