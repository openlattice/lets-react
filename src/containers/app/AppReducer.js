/*
 * @flow
 */

import { Map, fromJS } from 'immutable';
import { RequestStates } from 'redux-reqseq';
import type { SequenceAction } from 'redux-reqseq';

import { RESET_REQUEST_STATE } from '../../core/redux/ReduxActions';
import {
  INITIALIZE_APPLICATION,
  initializeApplication,
} from './AppActions';

const INITIAL_STATE :Map<*, *> = fromJS({
  [INITIALIZE_APPLICATION]: {
    requestState: RequestStates.STANDBY,
  },
});

export default function appReducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case RESET_REQUEST_STATE: {
      const { actionType } = action;
      if (actionType && state.has(actionType)) {
        return state.setIn([actionType, 'requestState'], RequestStates.STANDBY);
      }
      return state;
    }

    case initializeApplication.case(action.type): {
      const seqAction :SequenceAction = action;
      return initializeApplication.reducer(state, seqAction, {
        REQUEST: () => state.setIn([INITIALIZE_APPLICATION, 'requestState'], RequestStates.PENDING),
        SUCCESS: () => state.setIn([INITIALIZE_APPLICATION, 'requestState'], RequestStates.SUCCESS),
        FAILURE: () => state.setIn([INITIALIZE_APPLICATION, 'requestState'], RequestStates.FAILURE),
      });
    }

    default:
      return state;
  }
}
