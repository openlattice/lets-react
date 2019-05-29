/*
 * @flow
 */

import isNumber from 'lodash/isNumber';
import { Map, fromJS } from 'immutable';
import type { SequenceAction } from 'redux-reqseq';

import {
  INITIALIZE_APPLICATION,
  initializeApplication,
} from './AppActions';

const INITIAL_STATE :Map<*, *> = fromJS({
  [INITIALIZE_APPLICATION]: { error: false },
  isInitializingApplication: false,
});

export default function appReducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case initializeApplication.case(action.type): {
      return initializeApplication.reducer(state, action, {
        REQUEST: () => {
          const seqAction :SequenceAction = action;
          return state
            .set('isInitializingApplication', true)
            .setIn([INITIALIZE_APPLICATION, seqAction.id], seqAction);
        },
        SUCCESS: () => {

          const seqAction :SequenceAction = action;
          const storedSeqAction :SequenceAction = state.getIn([INITIALIZE_APPLICATION, seqAction.id]);

          if (!storedSeqAction) {
            return state;
          }

          const { value } = storedSeqAction;
          if (value === null || value === undefined) {
            return state;
          }

          // TODO: do something with "value"
          return state;
        },
        FAILURE: () => {

          const seqAction :SequenceAction = action;
          const error = {};

          /*
           * value is expected to be an error object. for lattice-sagas / lattice-js, the error object is expected
           * to be the Axios error object. for more info:
           *   https://github.com/axios/axios#handling-errors
           */
          const { value: axiosError } = seqAction;
          if (axiosError && axiosError.response && isNumber(axiosError.response.status)) {
            // for now, we only care about the HTTP status code. we can get more fancy later on.
            error.status = axiosError.response.status;
          }

          // TODO: there's probably a significantly better way of handling errors
          return state.setIn([INITIALIZE_APPLICATION, 'error'], fromJS(error));
        },
        FINALLY: () => {
          const seqAction :SequenceAction = action;
          return state
            .set('isInitializingApplication', false)
            .deleteIn([INITIALIZE_APPLICATION, seqAction.id]);
        }
      });
    }

    default:
      return state;
  }
}
