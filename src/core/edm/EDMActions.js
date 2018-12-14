/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';

const GET_EDM_TYPES :'GET_EDM_TYPES' = 'GET_EDM_TYPES';
const getEntityDataModelTypes :RequestSequence = newRequestSequence(GET_EDM_TYPES);

const GET_ENTITY_SET_IDS :'GET_ENTITY_SET_IDS' = 'GET_ENTITY_SET_IDS';
const getEntitySetIds :RequestSequence = newRequestSequence(GET_ENTITY_SET_IDS);

export {
  GET_EDM_TYPES,
  GET_ENTITY_SET_IDS,
  getEntityDataModelTypes,
  getEntitySetIds,
};
