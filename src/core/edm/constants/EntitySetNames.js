/*
 * @flow
 */

const ASSOCIATION_ENTITY_SET_NAMES = {};

const ENTITY_SET_NAMES = {};

const ENTITY_SET_NAMES_LIST = [];
Object.keys(ASSOCIATION_ENTITY_SET_NAMES).forEach((name :string) => {
  ENTITY_SET_NAMES_LIST.push(ASSOCIATION_ENTITY_SET_NAMES[name]);
});
Object.keys(ENTITY_SET_NAMES).forEach((name :string) => {
  ENTITY_SET_NAMES_LIST.push(ENTITY_SET_NAMES[name]);
});

export {
  ASSOCIATION_ENTITY_SET_NAMES,
  ENTITY_SET_NAMES,
  ENTITY_SET_NAMES_LIST,
};
