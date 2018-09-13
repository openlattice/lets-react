import { Map } from 'immutable';

import reducer from './AppReducer';
import {
  LOAD_APP,
  loadApp,
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
    expect(INITIAL_STATE.get('isLoadingApp')).toEqual(false);
    expect(INITIAL_STATE.get('actions').toJS()).toEqual({
      loadApp: {},
    });
    expect(INITIAL_STATE.get('errors').toJS()).toEqual({
      loadApp: {},
    });
  });

  describe(LOAD_APP, () => {

    test(loadApp.REQUEST, () => {

      const { id } = loadApp();
      const state = reducer(INITIAL_STATE, loadApp.request(id, MOCK_APP_NAME));

      expect(state.get('isLoadingApp')).toEqual(true);
      expect(state.getIn(['actions', 'loadApp', id]).toJS())
        .toEqual({
          id,
          type: loadApp.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'loadApp']).toJS()).toEqual({});
    });

    test(loadApp.SUCCESS, () => {

      const { id } = loadApp();
      let state = reducer(INITIAL_STATE, loadApp.request(id, MOCK_APP_NAME));
      state = reducer(state, loadApp.success(id));

      expect(state.get('isLoadingApp')).toEqual(true);
      expect(state.getIn(['actions', 'loadApp', id]).toJS())
        .toEqual({
          id,
          type: loadApp.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'loadApp']).toJS()).toEqual({});
    });

    test(loadApp.FAILURE, () => {

      const { id } = loadApp();
      let state = reducer(INITIAL_STATE, loadApp.request(id, MOCK_APP_NAME));
      state = reducer(state, loadApp.failure(id, MOCK_ERR_RESPONSE));

      expect(state.get('isLoadingApp')).toEqual(true);
      expect(state.getIn(['actions', 'loadApp', id]).toJS())
        .toEqual({
          id,
          type: loadApp.REQUEST,
          value: MOCK_APP_NAME,
        });
      expect(state.getIn(['errors', 'loadApp']).toJS()).toEqual({
        status: MOCK_ERR_STATUS,
      });
    });

    test(loadApp.FINALLY, () => {

      const { id } = loadApp();
      let state = reducer(INITIAL_STATE, loadApp.request(id, MOCK_APP_NAME));
      expect(state.getIn(['actions', 'loadApp', id]).toJS())
        .toEqual({
          id,
          type: loadApp.REQUEST,
          value: MOCK_APP_NAME
        });

      state = reducer(state, loadApp.finally(id));
      expect(state.get('isLoadingApp')).toEqual(false);
      expect(state.hasIn(['actions', 'loadApp', id])).toEqual(false);
      expect(state.getIn(['errors', 'loadApp']).toJS()).toEqual({});
    });

  });

});
