/*
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
// import lattice from 'lattice';
// ${props => props.small ? '0.25em 1em' : '0.5em 2em'}
// ${this.props.active ? 'lightblue' : ''}
const ListItem = styled.div`
    background: ${props => (props.active ? 'lightblue' : 'transparent')};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    padding: 10px;
    border-top: 1px solid rgb(197, 213, 229);
    &:hover {
      background: ${props => (props.active ? 'lightblue' : 'lightgrey')};
    }
`;

const TitleLeft = styled.div`
  width: 70%;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;

const DescribeRight = styled.div`
  width: 30%;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;

type Props = {
  activeItem :number;
  listItems :object;
  setActiveItem :() => void;
};

export default function DataListTable(props :Props) {
  return (
    <div>
      {props.listItems.map((item, index) => {
        const data = item.entityType ? item.entityType : item;
        return (
          <ListItem
              active={index === props.activeItem}
              key={data.id}
              onClick={() => {
                props.setActiveItem(data.id, index);
              }}>
            <TitleLeft>
              <section>
                {data.title}
              </section>
            </TitleLeft>
            <DescribeRight>
              <section>
                  test
              </section>
            </DescribeRight>
          </ListItem>
        );
      })}
    </div>
  );
}
