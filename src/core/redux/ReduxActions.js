/*
 * @flow
 */

const RESET_REQUEST_STATE :'RESET_REQUEST_STATE' = 'RESET_REQUEST_STATE';
function resetRequestState(actionType :string) {
  return {
    actionType,
    type: RESET_REQUEST_STATE,
  };
}

export {
  RESET_REQUEST_STATE,
  resetRequestState,
};
