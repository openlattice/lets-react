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
      // console.log('requested action', action);
      return action.itemIndex;
    default:
      return state;
  }
};

const listItems = (state = [], action) => {
  // return entity;
  switch (action.type) {
    case actionType.UPDATE_LIST:
      console.log('UPDATE_LIST', action);
      return types[action.value];
    case actionType.LOADED_FETCH_ENTITY_DATA:
      console.log('LOADED_FETCH_DATA', action);
      return action.data;
    default:
      return state;
  }
};

const entityData = (state = [], action) => {
  switch (action.type) {
    case actionType.LOADED_FETCH_ENTITY_DATA:
      return action.data;
  }
};
const propertyData = (state = [], action) => {
  switch (action.type) {
    case actionType.LOADED_FETCH_PROPERTY_DATA:
      return action.data;
  }
};
const associationData = (state = [], action) => {
  switch (action.type) {
    case actionType.LOADED_FETCH_ASSOCIATION_DATA:
      return action.data;
  }
};

export default combineReducers({
  activeItem,
  listItems,
  entityData,
  propertyData,
  associationData
});
