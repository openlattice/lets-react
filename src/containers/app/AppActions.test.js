import { OrderedSet } from 'immutable';

import * as AppActions from './AppActions';

import { TestUtils } from '../../utils/testing';

const { testShouldExportActionTypes, testShouldExportRequestSequences } = TestUtils;

const ACTION_TYPES = OrderedSet([
  'INITIALIZE_APPLICATION',
]).toJS();

const REQSEQ_NAMES = OrderedSet([
  'initializeApplication',
]).toJS();

describe('AppActions', () => {

  testShouldExportActionTypes(AppActions, ACTION_TYPES);
  testShouldExportRequestSequences(AppActions, ACTION_TYPES, REQSEQ_NAMES);
});
