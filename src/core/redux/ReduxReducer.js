/*
 * @flow
 */

import { combineReducers } from 'redux-immutable';
import { actionType } from '../Constants/index';
import property from '../../../testData/property.json';
import entity from '../../../testData/entity.json';
import association from '../../../testData/association.json';

const types = {
  property,
  entity,
  association
};

const activeItem = (state = 0, action) => {
  switch (action.type) {
    case actionType.UPDATE_ACTIVE_ITEM:
      console.log('requested action', action);
      return action.itemIndex;
    default:
      return 0;
  }
};

const listItems = (state = [], action) => {
  switch (action.type) {
    case actionType.UPDATE_LIST:
      console.log('UPDATE_LIST', action);
      return types[action.value];
      break;
    default:
      return state;
  }
};

export default combineReducers({
  activeItem,
  listItems
});
