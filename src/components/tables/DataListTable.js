/*
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
// import lattice from 'lattice';

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    -webkit-box-pack: start;
    padding: 10px;
    border-top: 1px solid rgb(197, 213, 229);
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
  listItems :object;
  setActiveItem :() => void;
};

export default function DataListTable(props :Props) {
  console.log('DataListTable props', props);
  return (
    <div>
      {props.listItems.map((item, index) => (
        <ListItem
            key={item.id}
            onClick={() => {
              props.setActiveItem(item.id, index);
            }}>
          <TitleLeft>
            <section>
              {item.title}
            </section>
          </TitleLeft>
          <DescribeRight>
            <section>
              test
            </section>
          </DescribeRight>
        </ListItem>
      ))}
    </div>
  );
}
