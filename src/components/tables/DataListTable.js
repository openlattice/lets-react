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
