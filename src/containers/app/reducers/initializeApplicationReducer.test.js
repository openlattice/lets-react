import { fromJS } from 'immutable';
import { RequestStates } from 'redux-reqseq';

import reducer from './initializeApplicationReducer';

import { RS_INITIAL_STATE } from '../../../core/redux/constants';
import { INITIALIZE_APPLICATION, initializeApplication } from '../actions';

const MOCK_APP_NAME = 'TestApp';
const MOCK_ERR_STATUS = 500;
const MOCK_ERR_RESPONSE = {
  response: {
    status: MOCK_ERR_STATUS,
  },
};

const INITIAL_STATE = fromJS({
  [INITIALIZE_APPLICATION]: RS_INITIAL_STATE,
});

describe('AppReducer', () => {

  describe(INITIALIZE_APPLICATION, () => {

    test(initializeApplication.REQUEST, () => {

      const { id } = initializeApplication();
      const requestAction = initializeApplication.request(id, MOCK_APP_NAME);
      const state = reducer(INITIAL_STATE, requestAction);
      expect(state.getIn([INITIALIZE_APPLICATION, 'requestState'])).toEqual(RequestStates.PENDING);
    });

    test(initializeApplication.SUCCESS, () => {

      const { id } = initializeApplication();
      const requestAction = initializeApplication.request(id, MOCK_APP_NAME);
      let state = reducer(INITIAL_STATE, requestAction);
      state = reducer(state, initializeApplication.success(id));
      expect(state.getIn([INITIALIZE_APPLICATION, 'requestState'])).toEqual(RequestStates.SUCCESS);
    });

    test(initializeApplication.FAILURE, () => {

      const { id } = initializeApplication();
      const requestAction = initializeApplication.request(id, MOCK_APP_NAME);
      let state = reducer(INITIAL_STATE, requestAction);
      state = reducer(state, initializeApplication.failure(id, MOCK_ERR_RESPONSE));
      expect(state.getIn([INITIALIZE_APPLICATION, 'requestState'])).toEqual(RequestStates.FAILURE);
    });

    test(initializeApplication.FINALLY, () => {

      const { id } = initializeApplication();
      let state = reducer(INITIAL_STATE, initializeApplication.request(id, MOCK_APP_NAME));
      state = reducer(state, initializeApplication.success(id));
      state = reducer(state, initializeApplication.finally(id));
      expect(state.getIn([INITIALIZE_APPLICATION, 'requestState'])).toEqual(RequestStates.SUCCESS);
    });

  });

});
