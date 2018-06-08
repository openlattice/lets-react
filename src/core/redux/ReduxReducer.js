/*
 * @flow
 */

// import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';
import { actionType } from '../Constants/index';

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
      break;
    default:
      return state;
  }
};

export default combineReducers({
  activeItem,
  listItems
});


// export default function reduxReducer() {
//   return combineReducers({
//     // auth: AuthReducer
//   });
// }
