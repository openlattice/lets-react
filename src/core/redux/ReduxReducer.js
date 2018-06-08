/*
 * @flow
 */

// import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';
import { actionType } from '../Constants/index';

const activeItem = (state = [], action) => {
  switch (action.type) {
    case actionType.UPDATE_ACTIVE_ITEM:
      console.log('requested action', action);
      return action.itemIndex;
    // case 'ADD_TODO':
    //   return [
    //     ...state,
    //     {
    //       id: action.id,
    //       text: action.text,
    //       completed: false
    //     }
    //   ];
    // case 'TOGGLE_TODO':
    //   return state.map(todo =>
    //     ((todo.id === action.id)
    //       ? { ...todo, completed: !todo.completed }
    //       : todo));
    default:
      console.log('hello from the reducer', state);
      return 2; // this is working on initial load
  }
};

// export default activeItem
export default combineReducers({
  activeItem
  // visibilityFilter
});


// export default function reduxReducer() {
//   return combineReducers({
//     // auth: AuthReducer
//   });
// }
