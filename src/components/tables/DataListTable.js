/*
 * @flow
 */

import React from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
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

const Split = styled.div`
  width: 50%;
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
  console.log(props);
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
            <Split>
              <section>
                {data.title}
              </section>
            </Split>
            <Split>
              <section>
                {`${data.type.namespace}.${data.type.name}`}
              </section>
            </Split>
          </ListItem>
        );
      })}
    </div>
  );
}
