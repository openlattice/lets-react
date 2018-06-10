/*
 * @flow
 */

import { actionType } from '../../core/Constants/index';

const setActiveItem = (id, itemIndex) => ({ type: actionType.UPDATE_ACTIVE_ITEM, itemIndex });

export default {
  setActiveItem
};

