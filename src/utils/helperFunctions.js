import association from '../../testData/association.json';
import entity from '../../testData/entity.json';
import property from '../../testData/property.json';

export function getDetails(item) {
  const details = {};

  details.Source = item.src.map(number => entity.find(el => el.id === number));
  details.Destination = item.dst.map(number => entity.find(el => el.id === number));

  details.Key = item.entityType.key.map(number => property.find(el => el.id === number));
  details.Properties = item.entityType.properties.map(number => property.find(el => el.id === number));

  return details;
}

export default { test: 'thing' };

const example = {
  entityType: {
    id: '09e3ab1f-fa13-4371-93d7-e7adf61c7876',
    type: {
      namespace: 'general',
      name: 'DiagnosedWith'
    },
    title: 'DiagnosedWith',
    description: 'An association between a diagnosis and patient. NOTE this will eventually be renamed "general.assessedwith"',
    schemas: [],
    key: [
      '0ee66bf8-7158-4b33-9cbf-63682291536c',
      '5260cfbd-bfa4-40c1-ade5-cd83cc9f99b2'
    ],
    properties: [
      '5260cfbd-bfa4-40c1-ade5-cd83cc9f99b2',
      '0ee66bf8-7158-4b33-9cbf-63682291536c',
      '4cc82f90-fb84-426d-acb0-530c96008b1d'
    ],
    baseType: null,
    category: 'AssociationType'
  },
  src: [
    '31cf5595-3fe9-4d3e-a9cf-39355a4b8cab'
  ],
  dst: [
    '7958998f-cc0c-4e09-ad4c-ad725e7ef1a9'
  ],
  bidirectional: false
};
