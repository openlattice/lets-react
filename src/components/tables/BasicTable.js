/*
 * @flow
 */

import styled from 'styled-components';

import { colors } from '../../core/Constants';

export const ListItem = styled.div`
    background: ${props => (props.active ? colors.SELECTED : colors.TRANSPARENT)};
    color: ${props => (props.active ? colors.BASE_TEXT : 'black')};
    display: flex;
    flex-direction: row;
    font-size: .9rem;
    padding: .6rem;
    border-top: ${colors.BORDERS};
    cursor: ${props => (props.active ? 'default' : 'pointer')};
    &:hover {
      background: ${props => (props.active ? colors.SELECTED : colors.HOVER)};
    }
`;

export const Split = styled.div`
  width: 50%;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;
