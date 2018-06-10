/*
 * @flow
 */

export function getDetails(association :object) {
  const details = {};

  details.Source = association.src.map(number => entity.find(el => el.id === number));
  details.Destination = association.dst.map(number => entity.find(el => el.id === number));

  details.Key = association.entityType.key.map(number => property.find(el => el.id === number));
  details.Properties = association.entityType.properties.map(number => property.find(el => el.id === number));

  return details;
}

export function randomId() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id
  return Math.random().toString(36).slice(2);
}
