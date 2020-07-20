/*
 * @flow
 */

import { Map, Set, isCollection } from 'immutable';
import { Models } from 'lattice';
import { LangUtils, ValidationUtils } from 'lattice-utils';
import { useSelector } from 'react-redux';
import type { UUID } from 'lattice';

import { REDUCERS } from '../redux/constants';

const { isValidUUID } = ValidationUtils;
const { isNonEmptyArray, isNonEmptyString } = LangUtils;
const { EntitySet } = Models;

const { EDM } = REDUCERS;

const selectEntitySet = (idOrName :UUID | string) => (state :Map) :?EntitySet => {
  if (state.hasIn([EDM, 'entitySetsIndexMap', idOrName])) {
    const index :number = state.getIn([EDM, 'entitySetsIndexMap', idOrName]);
    if (state.hasIn([EDM, 'entitySets', index])) {
      return state.getIn([EDM, 'entitySets', index]);
    }
  }
  return undefined;
};

type IdsOrNames =
  | UUID[]
  | string[]
  | Set<UUID>
  | Set<string>;

// TODO: OPTIMIZE / MEMOIZE
const useEntitySets = (idsOrNames :?IdsOrNames) :{ [UUID] :EntitySet } => (
  useSelector((state :Map) => {

    const isValid = (
      (isNonEmptyArray(idsOrNames) || isCollection(idsOrNames))
      && (
        idsOrNames.every(isValidUUID) || idsOrNames.every(isNonEmptyString)
      )
    );

    if (!isValid || !idsOrNames) {
      return {};
    }

    const entitySetsMap = {};
    idsOrNames.forEach((idOrName) => {
      const entitySetIndex :number = state.getIn([EDM, 'entitySetsIndexMap', idOrName], -1);
      if (entitySetIndex >= 0) {
        const entitySet :?EntitySet = state.getIn([EDM, 'entitySets', entitySetIndex]);
        if (entitySet && entitySet.id) {
          entitySetsMap[entitySet.id] = entitySet;
        }
      }
    });

    return entitySetsMap;
  })
);

export {
  selectEntitySet,
  useEntitySets,
};
