/*
 * @flow
 */

import React from 'react';
// import styled from 'styled-components';
// import lattice from 'lattice';
// import StyledCard from '../cards/StyledCard';
import property from '../../../testData/property.json';

type Props = {
  clickItem :() => void;
  item :object;
};

export default function DetailsListTable(props :Props) {
  console.log(props);
  const item = property[0];
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
    </div>
  );
}
