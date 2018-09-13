import { Set } from 'immutable';

import * as AppActions from './AppActions';
import { testShouldExportActionTypes, testShouldExportRequestSequences } from '../../utils/testing/TestUtils';

const ACTION_TYPES = Set([
  'LOAD_APP',
]).sort();

const REQSEQ_NAMES = Set([
  'loadApp',
]).sort();

describe('AppActions', () => {

  testShouldExportActionTypes(AppActions, ACTION_TYPES.toJS());
  testShouldExportRequestSequences(AppActions, ACTION_TYPES.toJS(), REQSEQ_NAMES.toJS());
});
