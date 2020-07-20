/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';
import { DataUtils, ReduxConstants } from 'lattice-utils';
import { RequestStates } from 'redux-reqseq';
import type { UUID } from 'lattice';
import type { SequenceAction } from 'redux-reqseq';

import {
  FETCH_ENTITY_SET_DATA,
  fetchEntitySetData,
} from './DataActions';

import { ReduxActions } from '../redux';

const { REQUEST_STATE } = ReduxConstants;
const { RESET_REQUEST_STATE } = ReduxActions;
const { getEntityKeyId } = DataUtils;

const INITIAL_STATE :Map = fromJS({
  [FETCH_ENTITY_SET_DATA]: Map(),
  entitySetData: Map(),
});

export default function reducer(state :Map = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case RESET_REQUEST_STATE: {
      const { path } = action;
      if (path && state.hasIn(path)) {
        return state.setIn([...path, REQUEST_STATE], RequestStates.STANDBY);
      }
      return state;
    }

    case fetchEntitySetData.case(action.type): {
      const seqAction :SequenceAction = action;
      return fetchEntitySetData.reducer(state, seqAction, {
        REQUEST: () => {

          const { entitySetId } = seqAction.value;
          return state
            .setIn([FETCH_ENTITY_SET_DATA, entitySetId, REQUEST_STATE], RequestStates.PENDING)
            .setIn([FETCH_ENTITY_SET_DATA, seqAction.id], seqAction);
        },
        SUCCESS: () => {

          if (state.hasIn([FETCH_ENTITY_SET_DATA, seqAction.id])) {

            const storedSeqAction = state.getIn([FETCH_ENTITY_SET_DATA, seqAction.id]);
            const { entityKeyIds, entitySetId } :{
              entityKeyIds :Set<UUID>;
              entitySetId :UUID;
            } = storedSeqAction.value;

            let entitySetData = state.get('entitySetData');
            fromJS(seqAction.value).forEach((entity :Map) => {
              const entityKeyId :?UUID = getEntityKeyId(entity);
              if (entityKeyIds.has(entityKeyId)) {
                entitySetData = entitySetData.setIn([entitySetId, entityKeyId], entity);
              }
            });

            return state
              .set('entitySetData', entitySetData)
              .setIn([FETCH_ENTITY_SET_DATA, entitySetId, REQUEST_STATE], RequestStates.SUCCESS);
          }

          return state;
        },
        FAILURE: () => {

          if (state.hasIn([FETCH_ENTITY_SET_DATA, seqAction.id])) {
            const storedSeqAction = state.getIn([FETCH_ENTITY_SET_DATA, seqAction.id]);
            const { entitySetId } = storedSeqAction.value;
            return state.setIn([FETCH_ENTITY_SET_DATA, entitySetId, REQUEST_STATE], RequestStates.FAILURE);
          }

          return state;
        },
        FINALLY: () => state.deleteIn([FETCH_ENTITY_SET_DATA, seqAction.id]),
      });
    }

    default:
      return state;
  }
}
