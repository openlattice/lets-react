/*
 * @flow
 */

import React from 'react';
import type { Node } from 'react';

import styled from 'styled-components';

const Error = styled.div`
  align-items: center;
  display: flex;
  flex: 0;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  text-align: center;

  > span {
    margin: 10px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

type Props = {
  children ?:Node;
  error :?Object;
  message :?string;
};

const BasicErrorComponent = ({ children, error, message } :Props) => {

  let errorMessage = message;
  if (error && (error.status === 401 || error.status === 403)) {
    errorMessage = 'You are not authorized to view this page.';
  }

  if (!errorMessage) {
    errorMessage = 'Sorry, something went wrong. Please try again.';
  }

  return (
    <Error>
      {
        children || <span>{errorMessage}</span>
      }
    </Error>
  );
};

BasicErrorComponent.defaultProps = {
  children: undefined,
  error: undefined,
  message: undefined,
};

export default BasicErrorComponent;
