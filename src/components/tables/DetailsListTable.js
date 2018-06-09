/*
 * @flow
 */

import React from 'react';

type Props = {
  clickItem :() => void;
  getDetails :() => void;
  item :object;
};

const tables = (item) => {
  console.log('make');
  return (
    <div>
      temp
    </div>
  );
};

export default function DetailsListTable(props :Props) {
  console.log('DetailsListTable', props);
  const item = props.item.entityType ? props.item.entityType : props.item;
  const details = props.item.entityType ? props.getDetails(props.item) : null;
  console.log('details', details);
  return (
    <div>
      <h1>
        Type Details
      </h1>
      <h2>
        Title
      </h2>
      {item.title}
      <h2>
        ID
      </h2>
      {item.id}
      <h2>
        Type
      </h2>
      {`${item.type.namespace}.${item.type.name}`}
      <h2>
        Description
      </h2>
      {item.description.length > 0 ? item.description : 'None'}
      {props.item.entityType ? '' : ''}
    </div>
  );
}
