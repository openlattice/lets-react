/*
 * @flow
 */

const RESET_REQUEST_STATE :'RESET_REQUEST_STATE' = 'RESET_REQUEST_STATE';
function resetRequestState(path :string[]) {
  return {
    path,
    type: RESET_REQUEST_STATE,
  };
}

export {
  RESET_REQUEST_STATE,
  resetRequestState,
};
