import { OrderedSet } from 'immutable';

import * as EDMActions from '.';
import { testShouldExportActionTypes, testShouldExportRequestSequences } from '../../../utils/testing/TestUtils';

const ACTION_TYPES = OrderedSet([
  'GET_EDM_TYPES',
]).toJS();

const REQSEQ_NAMES = OrderedSet([
  'getEntityDataModelTypes',
]).toJS();

describe('EDMActions', () => {

  testShouldExportActionTypes(EDMActions, ACTION_TYPES);
  testShouldExportRequestSequences(EDMActions, ACTION_TYPES, REQSEQ_NAMES);
});
