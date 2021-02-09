/*
 * @flow
 */

import { Map } from 'immutable';
import { RequestStates } from 'redux-reqseq';

import { ERROR, REQUEST_STATE } from '../constants';

export default function reducer(state :Map, action :Object) {

  const { path } = action;
  if (path && state.hasIn(path)) {
    return state
      .setIn([...path, ERROR], false)
      .setIn([...path, REQUEST_STATE], RequestStates.STANDBY);
  }

  return state;
}
