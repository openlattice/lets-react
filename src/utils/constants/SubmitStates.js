/*
 * @flow
 */

type SubmitStateEnum = {|
  PRE_SUBMIT :0;
  IS_SUBMITTING :1;
  SUBMIT_SUCCESS :2;
  SUBMIT_FAILURE :3;
|};
type SubmitState = $Values<SubmitStateEnum>;

// TODO: look into using Immutable.Map() or other possible "enum" libraries
const SubmitStates :SubmitStateEnum = Object.freeze({
  PRE_SUBMIT: 0,
  IS_SUBMITTING: 1,
  SUBMIT_SUCCESS: 2,
  SUBMIT_FAILURE: 3,
});

export default SubmitStates;
export type {
  SubmitState,
  SubmitStateEnum,
};
