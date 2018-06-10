/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';

import MainBody from '../../containers/tables/MainBody';
import OpenLatticeLogo from '../../assets/images/logo_and_name.png';
import StyledButton from '../../components/buttons/StyledButton';
import * as Routes from '../../core/router/Routes';
import { colors } from '../../core/Constants/index';

/*
 * styled components
 */

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 800px;
  position: relative;
`;

const AppHeaderOuterWrapper = styled.header`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  min-width: 800px;
  position: relative;
`;

const AppHeaderInnerWrapper = styled.div`
  align-items: center;
  background-color: ${colors.BACKGROUND};
  border-bottom: ${colors.BORDERS};
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  height: 100px;
  justify-content: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: normal;
  margin: 0;
`;

const StyledActionButton = StyledButton.extend`
  position: absolute;
  right: 50px;
`;

const Logo = styled.img`
  position: absolute;
  left: 50px;
`;

/*
 * types
 */

type Props = {
  clickLogoutMock :() => void;
};

const AppContainer = (props :Props) => (
  <AppWrapper>
    <AppHeaderOuterWrapper>
      <AppHeaderInnerWrapper>
        <Logo src={OpenLatticeLogo} height="50" />
        <Title>OpenLattice React App</Title>
        <StyledActionButton onClick={props.clickLogoutMock}>
          Logout
        </StyledActionButton>
      </AppHeaderInnerWrapper>
    </AppHeaderOuterWrapper>
    <Switch>
      <Route path={Routes.ROOT} component={MainBody} />
      <Redirect to={Routes.ROOT} />
    </Switch>
  </AppWrapper>
);

const clickLogoutMock = () => {
  alert('Why would you want to do that?');
};

export default withRouter(connect(null, { clickLogoutMock })(AppContainer));
