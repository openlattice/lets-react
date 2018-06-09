/*
 * @flow
 */

import entity from '../../testData/entity.json';
import property from '../../testData/property.json';


export function getDetails(association :object) {
  const details = {};

  details.Source = association.src.map(number => entity.find(el => el.id === number));
  details.Destination = association.dst.map(number => entity.find(el => el.id === number));

  details.Key = association.entityType.key.map(number => property.find(el => el.id === number));
  details.Properties = association.entityType.properties.map(number => property.find(el => el.id === number));

  return details;
}
