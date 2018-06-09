/*
 * @flow
 */

import React from 'react';
import { ListItem, Split } from './BasicTable';

type Props = {
  activeItem :number;
  listItems :object;
  setActiveItem :() => void;
};

export default function DataListTable(props :Props) {
  if (props.listItems.length < 1) return <div>waiting</div>;
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
