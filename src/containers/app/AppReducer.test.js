import { Map } from 'immutable';

import reducer from './AppReducer';
import {
  INITIALIZE_APPLICATION,
  initializeApplication,
} from './AppActions';

const MOCK_APP_NAME = 'TestApp';
const MOCK_ERR_STATUS = 500;
const MOCK_ERR_RESPONSE = {
  response: {
    status: MOCK_ERR_STATUS,
  },
};

describe('AppReducer', () => {

  const INITIAL_STATE = reducer(undefined, { type: '__TEST__' });

  test('INITIAL_STATE', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Map);
    expect(INITIAL_STATE.get('isInitializingApplication')).toEqual(false);
    expect(INITIAL_STATE.get('actions').toJS()).toEqual({
      initializeApplication: {},
    });
    expect(INITIAL_STATE.get('errors').toJS()).toEqual({
      initializeApplication: {},
    });
  });

  describe(INITIALIZE_APPLICATION, () => {

    test(initializeApplication.REQUEST, () => {

      const { id } = initializeApplication();
      const state = reducer(INITIAL_STATE, initializeApplication.request(id, MOCK_APP_NAME));

      expect(state.get('isInitializingApplication')).toEqual(true);
      expect(state.getIn(['actions', 'initializeApplication', id]).toJS())
        .toEqual({
          id,
          type: initializeApplication.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'initializeApplication']).toJS()).toEqual({});
    });

    test(initializeApplication.SUCCESS, () => {

      const { id } = initializeApplication();
      let state = reducer(INITIAL_STATE, initializeApplication.request(id, MOCK_APP_NAME));
      state = reducer(state, initializeApplication.success(id));

      expect(state.get('isInitializingApplication')).toEqual(true);
      expect(state.getIn(['actions', 'initializeApplication', id]).toJS())
        .toEqual({
          id,
          type: initializeApplication.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'initializeApplication']).toJS()).toEqual({});
    });

    test(initializeApplication.FAILURE, () => {

      const { id } = initializeApplication();
      let state = reducer(INITIAL_STATE, initializeApplication.request(id, MOCK_APP_NAME));
      state = reducer(state, initializeApplication.failure(id, MOCK_ERR_RESPONSE));

      expect(state.get('isInitializingApplication')).toEqual(true);
      expect(state.getIn(['actions', 'initializeApplication', id]).toJS())
        .toEqual({
          id,
          type: initializeApplication.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'initializeApplication']).toJS()).toEqual({
        status: MOCK_ERR_STATUS,
      });
    });

    test(initializeApplication.FINALLY, () => {

      const { id } = initializeApplication();
      let state = reducer(INITIAL_STATE, initializeApplication.request(id, MOCK_APP_NAME));
      expect(state.getIn(['actions', 'initializeApplication', id]).toJS())
        .toEqual({
          id,
          type: initializeApplication.REQUEST,
          value: MOCK_APP_NAME
        });

      state = reducer(state, initializeApplication.finally(id));
      expect(state.get('isInitializingApplication')).toEqual(false);
      expect(state.hasIn(['actions', 'initializeApplication', id])).toEqual(false);
      expect(state.getIn(['errors', 'initializeApplication']).toJS()).toEqual({});
    });

  });

});
