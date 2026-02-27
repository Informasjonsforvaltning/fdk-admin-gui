import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  FETCH_DATA_SOURCES_SUCCEEDED,
  FETCH_DATA_SOURCES_FAILED,
  FETCH_DATASOURCE_STATUS_SUCCEEDED,
  FETCH_DATASOURCE_STATUS_FAILED,
  HARVEST_DATA_SOURCE_SUCCEEDED,
  HARVEST_DATA_SOURCE_FAILED,
  HARVEST_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_SUCCEEDED,
  UPDATE_DATA_SOURCE_SUCCEEDED,
  REMOVE_DATA_SOURCE_SUCCEEDED,
  HARVEST_STATUS_REQUESTED,
  HARVEST_STATUS_SUCCEEDED,
  HARVEST_STATUS_FAILED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataSources: [],
  organizations: [],
  harvestStatus: undefined,
  datasourceStatuses: {},
  snackbarVariant: undefined
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_DATA_SOURCES_REQUESTED:
      return state.set('isFetching', true);
    case FETCH_DATA_SOURCES_SUCCEEDED:
      return state
        .set('dataSources', fromJS(action.payload.dataSources))
        .set('datasourceStatuses', fromJS({}))
        .set('isFetching', false);
    case FETCH_DATA_SOURCES_FAILED:
      return state.set('dataSources', fromJS([])).set('isFetching', false);
    case REGISTER_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: any) =>
        dataSources.push(fromJS(action.payload.dataSource))
      );
    case UPDATE_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: any) =>
        dataSources.map((dataSource: any) =>
          dataSource.get('id') === action.payload.dataSource.id
            ? fromJS(action.payload.dataSource)
            : dataSource
        )
      );
    case REMOVE_DATA_SOURCE_SUCCEEDED:
      return state
        .update('dataSources', (dataSources: any) =>
          dataSources.filter(
            (dataSource: any) => dataSource.get('id') !== action.payload.id
          )
        )
        .update('datasourceStatuses', (statuses: any) =>
          statuses.remove(action.payload.id)
        );
    case HARVEST_DATA_SOURCE_REQUESTED:
      return state.set('snackbarVariant', undefined);
    case HARVEST_DATA_SOURCE_SUCCEEDED:
      return state.set('snackbarVariant', 'harvest:success');
    case HARVEST_DATA_SOURCE_FAILED:
      return state.set('snackbarVariant', 'harvest:error');
    case HARVEST_STATUS_REQUESTED:
      return state.set('harvestStatus', undefined);
    case FETCH_DATASOURCE_STATUS_SUCCEEDED:
      return state.setIn(
        ['datasourceStatuses', action.payload.id],
        fromJS(action.payload.states)
      );
    case FETCH_DATASOURCE_STATUS_FAILED:
      return state;
    case HARVEST_STATUS_SUCCEEDED:
      return state
        .set('harvestStatus', fromJS(action.payload.states))
        .setIn(
          ['datasourceStatuses', action.payload.id],
          fromJS(action.payload.states)
        );
    case HARVEST_STATUS_FAILED:
      return state.set('harvestStatus', undefined);
    default:
      return state;
  }
}
