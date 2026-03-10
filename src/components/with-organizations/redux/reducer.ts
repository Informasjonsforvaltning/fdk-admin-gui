import { fromJS, Map } from 'immutable';

import * as actions from './actions';
import { FETCH_ORGANIZATIONS_SUCCEEDED } from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organizations: []
}) as Map<string, any>;

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_SUCCEEDED:
      return state.set('organizations', fromJS(action.payload.organizations));
    default:
      return state;
  }
}
