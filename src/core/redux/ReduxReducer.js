/*
 * @flow
 */

import { combineReducers } from 'redux-immutable';
import { actionType } from '../Constants/index';

const activeItem = (state = 0, action) => {
  switch (action.type) {
    case actionType.UPDATE_ACTIVE_ITEM:
      // console.log(actionType.UPDATE_ACTIVE_ITEM, action);
      return action.itemIndex;
    default:
      return state;
  }
};

const listItems = (state = [], action) => {
  switch (action.type) {
    case actionType.UPDATE_LIST:
      // console.log(actionType.UPDATE_LIST, action);
      return `${action.value}Data`;
    default:
      return state;
  }
};

const entityData = (state = [], action) => {
  switch (action.type) {
    case actionType.FINISHED_FETCH_ENTITY_DATA:
      // console.log(actionType.FINISHED_FETCH_ENTITY_DATA, action);
      return action.data;
    default:
      return state;
  }
};
const propertyData = (state = [], action) => {
  switch (action.type) {
    case actionType.FINISHED_FETCH_PROPERTY_DATA:
      // console.log(actionType.FINISHED_FETCH_PROPERTY_DATA, action);
      return action.data;
    default:
      return state;
  }
};
const associationData = (state = [], action) => {
  switch (action.type) {
    case actionType.FINISHED_FETCH_ASSOCIATION_DATA:
      // console.log(actionType.FINISHED_FETCH_ASSOCIATION_DATA, action);
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  activeItem,
  listItems,
  entityData,
  propertyData,
  associationData
});
