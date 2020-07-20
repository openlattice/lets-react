import { OrderedSet } from 'immutable';

import * as ReduxActions from './ReduxActions';

import { TestUtils } from '../../utils/testing';

const { testShouldExportActionTypes, testShouldExportRequestSequences } = TestUtils;

const ACTION_TYPES = OrderedSet([
  'RESET_REQUEST_STATE',
]).toJS();

const REQSEQ_NAMES = OrderedSet([
]).toJS();

describe('ReduxActions', () => {

  testShouldExportActionTypes(ReduxActions, ACTION_TYPES);
  testShouldExportRequestSequences(ReduxActions, ACTION_TYPES, REQSEQ_NAMES);
});
