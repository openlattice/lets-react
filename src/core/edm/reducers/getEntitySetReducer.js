/*
 * @flow
 */

import { List, Map } from 'immutable';
import { Models } from 'lattice';
import { EntitySetsApiActions } from 'lattice-sagas';
import { RequestStates } from 'redux-reqseq';
import type { EntitySet, FQN, UUID } from 'lattice';
import type { SequenceAction } from 'redux-reqseq';

import {
  ENTITY_SETS,
  ENTITY_SETS_INDEX_MAP,
  REQUEST_STATE,
} from '../../redux/constants';

const { EntitySetBuilder } = Models;
const { GET_ENTITY_SET, getEntitySet } = EntitySetsApiActions;

export default function reducer(state :Map, action :SequenceAction) {

  return getEntitySet.reducer(state, action, {
    REQUEST: () => state
      .setIn([GET_ENTITY_SET, REQUEST_STATE], RequestStates.PENDING)
      .setIn([GET_ENTITY_SET, action.id], action),
    SUCCESS: () => {
      if (state.hasIn([GET_ENTITY_SET, action.id])) {

        const entitySet :EntitySet = (new EntitySetBuilder(action.value)).build();
        let entitySets :List<EntitySet> = state.get(ENTITY_SETS);
        let entitySetsIndexMap :Map<UUID | FQN, number> = state.get(ENTITY_SETS_INDEX_MAP);

        if (entitySetsIndexMap.has(entitySet.id)) {
          entitySets = entitySets.update(entitySetsIndexMap.get(entitySet.id), () => entitySet);
        }
        else {
          entitySets = entitySets.push(entitySet);
          const entitySetIndex :number = entitySets.count() - 1;
          entitySetsIndexMap = entitySetsIndexMap
            .set(entitySet.id, entitySetIndex)
            .set(entitySet.name, entitySetIndex);
        }

        return state
          .set(ENTITY_SETS, entitySets)
          .set(ENTITY_SETS_INDEX_MAP, entitySetsIndexMap)
          .setIn([GET_ENTITY_SET, REQUEST_STATE], RequestStates.SUCCESS);
      }
      return state;
    },
    FAILURE: () => {
      if (state.hasIn([GET_ENTITY_SET, action.id])) {
        return state.setIn([GET_ENTITY_SET, REQUEST_STATE], RequestStates.FAILURE);
      }
      return state;
    },
    FINALLY: () => state.deleteIn([GET_ENTITY_SET, action.id]),
  });
}
