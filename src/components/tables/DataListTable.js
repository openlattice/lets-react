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
  return (
    <div>
      {props.listItems.map((item, index) => {
        const data = item.entityType ? item.entityType : item;
        return (
          <ListItem
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
