/*
 * @flow
 */

// import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

// console.log(AuthReducer);

// const INITIAL_STATE = { activeItem: 0 };

// const activeItem = () => {
//   console.log('not sure whats going on');
//   // var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
//   // var action = arguments[1];


//   // switch (action.type) {

//   // }
// };

const activeItem = (state = [], action) => {
  switch (action.type) {
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
