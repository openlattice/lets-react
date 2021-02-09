/*
 * @flow
 */

import { Constants, Models } from 'lattice';

const { OPENLATTICE_ID_FQN } = Constants;
const { FQN } = Models;

const FQNS = {
  EKID: FQN.of(OPENLATTICE_ID_FQN),
  OL_DATE_TIME: FQN.of('ol.datetime'),
  OL_ID: FQN.of('ol.id'),
};

/* eslint-disable import/prefer-default-export */
export {
  FQNS,
};
