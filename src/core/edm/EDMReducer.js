/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { Models } from 'lattice';
import { Logger } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { EntityTypeObject, PropertyTypeObject } from 'lattice';
import type { SequenceAction } from 'redux-reqseq';

import {
  GET_EDM_TYPES,
  getEntityDataModelTypes,
} from './EDMActions';

const LOG :Logger = new Logger('EDMReducer');

const {
  EntityTypeBuilder,
  PropertyTypeBuilder,
} = Models;

const INITIAL_STATE :Map<*, *> = fromJS({
  [GET_EDM_TYPES]: {
    requestState: RequestStates.STANDBY,
  },
  entityTypes: List(),
  entityTypesIndexMap: Map(),
  propertyTypes: List(),
  propertyTypesIndexMap: Map(),
});

export default function edmReducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case getEntityDataModelTypes.case(action.type): {
      const seqAction :SequenceAction = action;
      return getEntityDataModelTypes.reducer(state, action, {
        REQUEST: () => state
          .setIn([GET_EDM_TYPES, 'requestState'], RequestStates.PENDING)
          .setIn([GET_EDM_TYPES, seqAction.id], seqAction),
        SUCCESS: () => {

          const rawEntityTypes :EntityTypeObject[] = seqAction.value.entityTypes;
          const entityTypes :List = List().asMutable();
          const entityTypesIndexMap :Map = Map().asMutable();

          rawEntityTypes.forEach((et :EntityTypeObject, index :number) => {
            try {
              const entityType = (new EntityTypeBuilder(et)).build();
              entityTypes.push(entityType);
              entityTypesIndexMap.set(entityType.id, index);
              entityTypesIndexMap.set(entityType.type, index);
            }
            catch (e) {
              LOG.error(seqAction.type, e);
              LOG.error(seqAction.type, et);
            }
          });

          const rawPropertyTypes :PropertyTypeObject[] = seqAction.value.propertyTypes;
          const propertyTypes :List = List().asMutable();
          const propertyTypesIndexMap :Map = Map().asMutable();

          rawPropertyTypes.forEach((pt :PropertyTypeObject, index :number) => {
            try {
              const propertyType = (new PropertyTypeBuilder(pt)).build();
              propertyTypes.push(propertyType);
              propertyTypesIndexMap.set(propertyType.id, index);
              propertyTypesIndexMap.set(propertyType.type, index);
            }
            catch (e) {
              LOG.error(seqAction.type, e);
              LOG.error(seqAction.type, pt);
            }
          });

          return state
            .set('entityTypes', entityTypes.asImmutable())
            .set('entityTypesIndexMap', entityTypesIndexMap.asImmutable())
            .set('propertyTypes', propertyTypes.asImmutable())
            .set('propertyTypesIndexMap', propertyTypesIndexMap.asImmutable())
            .setIn([GET_EDM_TYPES, 'requestState'], RequestStates.SUCCESS);
        },
        FAILURE: () => state
          .set('entityTypes', List())
          .set('entityTypesIndexMap', Map())
          .set('propertyTypes', List())
          .set('propertyTypesIndexMap', Map())
          .setIn([GET_EDM_TYPES, 'requestState'], RequestStates.FAILURE),
        FINALLY: () => state
          .deleteIn([GET_EDM_TYPES, seqAction.id]),
      });
    }

    default:
      return state;
  }
}
