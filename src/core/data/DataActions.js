/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const FETCH_ENTITY_SET_DATA :'FETCH_ENTITY_SET_DATA' = 'FETCH_ENTITY_SET_DATA';
const fetchEntitySetData :RequestSequence = newRequestSequence(FETCH_ENTITY_SET_DATA);

const SUBMIT_DATA_GRAPH :'SUBMIT_DATA_GRAPH' = 'SUBMIT_DATA_GRAPH';
const submitDataGraph :RequestSequence = newRequestSequence(SUBMIT_DATA_GRAPH);

const SUBMIT_PARTIAL_REPLACE :'SUBMIT_PARTIAL_REPLACE' = 'SUBMIT_PARTIAL_REPLACE';
const submitPartialReplace :RequestSequence = newRequestSequence(SUBMIT_PARTIAL_REPLACE);

export {
  FETCH_ENTITY_SET_DATA,
  SUBMIT_DATA_GRAPH,
  SUBMIT_PARTIAL_REPLACE,
  fetchEntitySetData,
  submitDataGraph,
  submitPartialReplace,
};
