/*
 * @flow
 */

import React from 'react';
// import { ListItem, Split } from './BasicTable';
import styled from 'styled-components';
import DataListTable from './DataListTable';

const ExpandedDetailsWrapper = styled.div`
  height: 20px;
  width: 20px;
  background: blue;
`;

const expandDetails = () => {
  console.log('expandingDetails');
  return <ExpandedDetailsWrapper />;
};

const makeTable = (title :string, section :object) => (
  <div key={title}>
    <h2>{title}</h2>
    <DataListTable
        listItems={section}
        setActiveItem={expandDetails}
        activeItem={NaN} />
  </div>
);

type Props = {
  getDetails :() => void;
  setActiveItem :() => void;
  item :object;
};

export default function DetailsListTable(props :Props) {
  // console.log('DetailsListTable has props:', props);
  const item = props.item.entityType ? props.item.entityType : props.item;
  const details = props.item.entityType ? props.getDetails(props.item) : null;

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
      {details ?
        <div>{Object.keys(details).map(section => makeTable(section, details[section]))}</div>
        : null}
    </div>
  );
}
