/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';

const LOAD_APP :'LOAD_APP' = 'LOAD_APP';
const loadApp :RequestSequence = newRequestSequence(LOAD_APP);

export {
  LOAD_APP,
  loadApp,
};
