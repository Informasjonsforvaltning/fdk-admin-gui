import { fromJS, Map } from 'immutable';

import * as actions from './actions';
import {
  FIND_ONE_DELEGATEE_SUCCEEDED,
  FIND_ONE_DELEGATEE_REQUESTED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  delegatee: null
}) as Map<string, any>;

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FIND_ONE_DELEGATEE_SUCCEEDED:
      return state.set('delegatee', fromJS(action.payload.delegatee));
    case FIND_ONE_DELEGATEE_REQUESTED:
      return state.set('delegatee', null);
    default:
      return state;
  }
}
