/*
 * @flow
 */

import { Map, fromJS } from 'immutable';
import { Models } from 'lattice';

import {
  getEntityDataModelTypes,
  getEntitySetIds,
} from './EDMActions';

// TODO: use models
const { FullyQualifiedName } = Models;

const INITIAL_STATE :Map<*, *> = fromJS({
  entitySetIdsByName: Map(),
  isFetchingAllEntitySetIds: false,
  isFetchingAllTypes: false,
  typeIdsByFqn: Map(),
  typesById: Map(),
});

export default function edmReducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case getEntityDataModelTypes.case(action.type): {
      return getEntityDataModelTypes.reducer(state, action, {
        REQUEST: () => state.set('isFetchingAllTypes', true),
        SUCCESS: () => {
          const seqAction :SequenceAction = (action :any);
          const types :Map<*, *> = fromJS(seqAction.value);
          const typeIdsByFqn :Map<FullyQualifiedName, string> = Map().asMutable();
          const typesById :Map<*, *> = Map().asMutable();
          types.forEach((type :Map<*, *>) => {
            // EntityType or PropertyType
            if (type.has('id')) {
              const typeFqn :FullyQualifiedName = new FullyQualifiedName(type.get('type'));
              const typeId :string = type.get('id');
              typeIdsByFqn.set(typeFqn, typeId);
              typesById.set(typeId, type);
            }
            // AssociationType
            else if (type.has('entityType')) {
              const typeFqn :FullyQualifiedName = new FullyQualifiedName(type.getIn(['entityType', 'type']));
              const typeId :string = type.getIn(['entityType', 'id']);
              typeIdsByFqn.set(typeFqn, typeId);
              typesById.set(typeId, type);
            }
          });
          return state
            .set('typeIdsByFqn', typeIdsByFqn.asImmutable())
            .set('typesById', typesById.asImmutable());
        },
        FAILURE: () => state.set('typesFqnToIdMap', Map()).set('typesById', Map()),
        FINALLY: () => state.set('isFetchingAllTypes', false),
      });
    }

    case getEntitySetIds.case(action.type): {
      return getEntitySetIds.reducer(state, action, {
        REQUEST: () => state.set('isFetchingAllEntitySetIds', true),
        SUCCESS: () => state.set('entitySetIdsByName', fromJS(action.value)),
        FAILURE: () => state.set('entitySetIdsByName', Map()),
        FINALLY: () => state.set('isFetchingAllEntitySetIds', false),
      });
    }

    default:
      return state;
  }
}
