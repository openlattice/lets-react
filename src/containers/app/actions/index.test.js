import { OrderedSet } from 'immutable';

import * as AppActions from '.';
import { testShouldExportActionTypes, testShouldExportRequestSequences } from '../../../utils/testing/TestUtils';

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
