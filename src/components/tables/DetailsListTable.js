/*
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
// import lattice from 'lattice';
// import StyledCard from '../cards/StyledCard';
import property from '../../../testData/property.json';

// console.log(property);

// const ListItem = styled.div`
//     display: flex;
//     flex-direction: row;
//     font-size: 14px;
//     -webkit-box-pack: start;
//     padding: 10px;
//     border-top: 1px solid rgb(197, 213, 229);
// `;

// const TitleLeft = styled.div`
//   width: 70%;
//       text-overflow: clip;
//     white-space: nowrap;
//     overflow: hidden;
// `;

// const DescribeRight = styled.div`
//   width: 30%;
//       text-overflow: clip;
//     white-space: nowrap;
//     overflow: hidden;
// `;

export default function DetailsListTable() {
  const item = property[0];
  return (
    <div>
      <h1>
        {item.title}
      </h1>
    </div>
  );
}
