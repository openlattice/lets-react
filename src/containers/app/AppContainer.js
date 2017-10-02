/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import StyledFlexComponent from '../../components/flex/StyledFlexComponent';
import StyledFlexComponentStacked from '../../components/flex/StyledFlexComponentStacked';
import { logout } from '../../core/auth/AuthActionFactory';

const StyledFlexHeaderComponent = StyledFlexComponent.withComponent('header');

const AppWrapper = StyledFlexComponentStacked.extend`
  background-color: #f7f8f9;
  color: #455a64;
  height: 100%;
  width: 100%;
`;

const AppHeaderWrapper = StyledFlexHeaderComponent.extend`
  align-items: center;
  background-color: #fefefe;
  border-bottom: 1px solid rgba(84, 110, 122, 0.2);
  justify-content: center;
  padding: 20px 50px;
  position: relative;
`;

const AppBodyWrapper = StyledFlexComponentStacked.extend`
  flex: 1 0 auto;
  padding: 50px;
`;

const StyledLogoutButton = styled.button`
  position: absolute;
  right: 50px;
`;

function mapDispatchToProps(dispatch :Function) {

  return {
    actions: bindActionCreators({ logout }, dispatch)
  };
}

type Props = {
  actions :{
    logout :Function
  }
};

const AppContainer = (props :Props) => {

  return (
    <AppWrapper>
      <AppHeaderWrapper>
        <h1>Lattice</h1>
        <StyledLogoutButton onClick={props.actions.logout}>Logout</StyledLogoutButton>
      </AppHeaderWrapper>
      <AppBodyWrapper>
        <h1>Hello, World!</h1>
      </AppBodyWrapper>
    </AppWrapper>
  );
};

export default connect(null, mapDispatchToProps)(AppContainer);
