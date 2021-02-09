/*
 * @flow
 */

const RESET_REQUEST_STATE :'RESET_REQUEST_STATE' = 'RESET_REQUEST_STATE';
type ResetRequestStateAction = (path :string[]) => {|
  path :string[];
  type :typeof RESET_REQUEST_STATE;
|};

const resetRequestState :ResetRequestStateAction = (path :string[]) => ({
  path,
  type: RESET_REQUEST_STATE,
});

export {
  RESET_REQUEST_STATE,
  resetRequestState,
};

export type {
  ResetRequestStateAction,
};
