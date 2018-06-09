/*
 * @flow
 */

import styled from 'styled-components';

export const ListItem = styled.div`
    background: ${props => (props.active ? 'lightblue' : 'transparent')};
    display: flex;
    flex-direction: row;
    font-size: .9rem;
    padding: .6rem;
    border-top: 1px solid grey;
    &:hover {
      background: ${props => (props.active ? 'lightblue' : 'lightgrey')};
    }
`;

export const Split = styled.div`
  width: 50%;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;
