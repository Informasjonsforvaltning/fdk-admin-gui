import { fromJS, Map } from 'immutable';

import * as actions from './actions';
import {
  FIND_ALL_DELEGATEES_SUCCEEDED,
  REGISTER_DELEGATEE_SUCCEEDED,
  REMOVE_DELEGATEE_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  delegatees: []
}) as Map<string, any>;

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FIND_ALL_DELEGATEES_SUCCEEDED:
      return state.set('delegatees', fromJS(action.payload.delegatees));
    case REGISTER_DELEGATEE_SUCCEEDED:
      return state.update('delegatees', (delegatees: any) =>
        delegatees.push(fromJS(action.payload.delegatee))
      );
    case REMOVE_DELEGATEE_SUCCEEDED:
      return state.update('delegatees', (delegatees: any) =>
        delegatees.filter(
          (delegatee: any) => delegatee.get('id') !== action.payload.id
        )
      );
    default:
      return state;
  }
}
