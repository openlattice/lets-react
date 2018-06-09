/*
 * @flow
 */

import entity from '../../testData/entity.json';
import property from '../../testData/property.json';

const endpoints = {
  property: 'https://api.openlattice.com/datastore/edm/property/type',
  entity: 'https://api.openlattice.com/datastore/edm/entity/type',
  association: 'https://api.openlattice.com/datastore/edm/association/type'
};

export const fetchData = {
  property: () => property,
  entity: () => entity
};
