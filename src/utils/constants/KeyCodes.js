// @flow

type KeyCodeEnum = {|
  ENTER :'Enter';
|};
type KeyCode = $Values<KeyCodeEnum>;

const KeyCodes :KeyCodeEnum = Object.freeze({
  ENTER: 'Enter'
});

export default KeyCodes;
export type {
  KeyCode,
  KeyCodeEnum,
};
