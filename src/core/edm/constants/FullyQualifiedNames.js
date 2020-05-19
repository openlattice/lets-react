/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const ASSOCIATION_ENTITY_TYPE_FQNS = {};
const ENTITY_TYPE_FQNS = {};

const PROPERTY_TYPE_FQNS = {
  OL_ID_FQN: FQN.of('ol.id'),
};

export {
  ASSOCIATION_ENTITY_TYPE_FQNS,
  ENTITY_TYPE_FQNS,
  PROPERTY_TYPE_FQNS,
};
