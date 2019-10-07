import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  FETCH_DATA_SOURCES_SUCCEEDED,
  REGISTER_DATA_SOURCE_SUCCEEDED,
  REMOVE_DATA_SOURCE_SUCCEEDED
} from './action-types';

import { Actions, DataSource } from '../../../types';

const initialState = fromJS({
  dataSources: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_DATA_SOURCES_REQUESTED:
      return state.set('dataSources', fromJS([]));
    case FETCH_DATA_SOURCES_SUCCEEDED:
      return state.set('dataSources', fromJS(action.payload.dataSources));
    case REGISTER_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: DataSource[]) =>
        dataSources.push(fromJS(action.payload.dataSource))
      );
    case REMOVE_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: DataSource[]) =>
        dataSources.filter(
          (dataSource: any) => dataSource.get('id') !== action.payload.id
        )
      );
    default:
      return state;
  }
}