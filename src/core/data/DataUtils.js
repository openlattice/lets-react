/*
 * @flow
 */

import { Collection, Map, Set } from 'immutable';
import { useSelector } from 'react-redux';
import type { UUID } from 'lattice';

import { REDUCERS } from '../redux/constants';

const { DATA } = REDUCERS;

const selectStoredEntityKeyIds = (entitySetId :UUID, entityKeyIds :Set<UUID>) :Set<UUID> => (
  (state :Map) => (
    state
      .getIn([DATA, 'entitySetData', entitySetId], Map())
      .keySeq()
      .filter((entityKeyId :UUID) => entityKeyIds.has(entityKeyId))
      .toSet()
  )
);

const useEntitySetData = (entitySetId :UUID, entityKeyIds :Collection<UUID> | UUID[]) :Map => (
  useSelector((state :Map) => {
    const entitySetData :Map = state.getIn([DATA, 'entitySetData', entitySetId], Map());
    return Map().withMutations((map) => {
      entityKeyIds.forEach((entityKeyId :UUID) => {
        map.set(entityKeyId, entitySetData.get(entityKeyId, Map()));
      });
    });
  })
);

export {
  selectStoredEntityKeyIds,
  useEntitySetData,
};
