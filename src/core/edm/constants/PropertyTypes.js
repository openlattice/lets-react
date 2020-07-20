/*
 * @flow
 */

import { Models } from 'lattice';

const { FQN } = Models;

const PROPERTY_TYPE_FQNS = {
  OL_DATE_TIME: FQN.of('ol.datetime'),
  OL_ID: FQN.of('ol.id'),
};

export default PROPERTY_TYPE_FQNS;
