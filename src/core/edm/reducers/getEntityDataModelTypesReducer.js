/*
 * @flow
 */

import { List, Map } from 'immutable';
import { Models } from 'lattice';
import { RequestStates } from 'redux-reqseq';
import type {
  EntityType,
  EntityTypeObject,
  FQN,
  PropertyType,
  PropertyTypeObject,
  UUID,
} from 'lattice';
import type { SequenceAction } from 'redux-reqseq';

import {
  ENTITY_TYPES,
  ENTITY_TYPES_INDEX_MAP,
  PROPERTY_TYPES,
  PROPERTY_TYPES_INDEX_MAP,
  REQUEST_STATE,
} from '../../redux/constants';
import {
  GET_EDM_TYPES,
  getEntityDataModelTypes,
} from '../actions';

const {
  EntityTypeBuilder,
  PropertyTypeBuilder,
} = Models;

export default function reducer(state :Map, action :SequenceAction) {

  return getEntityDataModelTypes.reducer(state, action, {
    REQUEST: () => state
      .setIn([GET_EDM_TYPES, REQUEST_STATE], RequestStates.PENDING)
      .setIn([GET_EDM_TYPES, action.id], action),
    SUCCESS: () => {

      const rawEntityTypes :EntityTypeObject[] = action.value.entityTypes;
      const entityTypes :List<EntityType> = List().asMutable();
      const entityTypesIndexMap :Map<UUID | FQN, number> = Map().asMutable();

      rawEntityTypes.forEach((et :EntityTypeObject, index :number) => {
        const entityType = (new EntityTypeBuilder(et)).build();
        entityTypes.push(entityType);
        entityTypesIndexMap.set(entityType.id, index);
        entityTypesIndexMap.set(entityType.type, index);
      });

      const rawPropertyTypes :PropertyTypeObject[] = action.value.propertyTypes;
      const propertyTypes :List<PropertyType> = List().asMutable();
      const propertyTypesIndexMap :Map<UUID | FQN, number> = Map().asMutable();

      rawPropertyTypes.forEach((pt :PropertyTypeObject, index :number) => {
        const propertyType = (new PropertyTypeBuilder(pt)).build();
        propertyTypes.push(propertyType);
        propertyTypesIndexMap.set(propertyType.id, index);
        propertyTypesIndexMap.set(propertyType.type, index);
      });

      return state
        .set(ENTITY_TYPES, entityTypes.asImmutable())
        .set(ENTITY_TYPES_INDEX_MAP, entityTypesIndexMap.asImmutable())
        .set(PROPERTY_TYPES, propertyTypes.asImmutable())
        .set(PROPERTY_TYPES_INDEX_MAP, propertyTypesIndexMap.asImmutable())
        .setIn([GET_EDM_TYPES, REQUEST_STATE], RequestStates.SUCCESS);
    },
    FAILURE: () => state
      .set(ENTITY_TYPES, List())
      .set(ENTITY_TYPES_INDEX_MAP, Map())
      .set(PROPERTY_TYPES, List())
      .set(PROPERTY_TYPES_INDEX_MAP, Map())
      .setIn([GET_EDM_TYPES, REQUEST_STATE], RequestStates.FAILURE),
    FINALLY: () => state.deleteIn([GET_EDM_TYPES, action.id]),
  });
}
