import { fromJS, Map } from 'immutable';

import * as actions from './actions';
import { UPDATE_FILTER_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  filter: {}
}) as Map<string, any>;

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case UPDATE_FILTER_SUCCEEDED:
      return state.set('filter', fromJS(action.payload.filter));
    default:
      return state;
  }
}
