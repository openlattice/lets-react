/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Button, Colors } from 'lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import AppNavigationContainer from './AppNavigationContainer';
import OpenLatticeLogo from '../../assets/images/logo_v2.png';
import * as Routes from '../../core/router/Routes';
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_WIDTH,
  APP_CONTENT_PADDING,
} from '../../core/style/Sizes';

const { logout } = AuthActionFactory;
const { NEUTRALS, WHITE } = Colors;

// TODO: this should come from lattice-ui-kit, maybe after the next release. current version v0.1.1
const APP_HEADER_BORDER :string = '#e6e6eb';

const AppHeaderOuterWrapper = styled.header`
  background-color: ${WHITE};
  border-bottom: 1px solid ${APP_HEADER_BORDER};
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
`;

const AppHeaderInnerWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  min-width: ${APP_CONTAINER_WIDTH}px;
  padding: 0 ${APP_CONTENT_PADDING}px;
`;

const LeftSideContentWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-start;
`;

const RightSideContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
`;

const LogoTitleWrapperLink = styled(Link)`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  padding: 15px 0;
  text-decoration: none;

  &:focus {
    text-decoration: none;
  }

  &:hover {
    outline: none;
    text-decoration: none;
  }
`;

const AppLogoIcon = styled.img.attrs({
  alt: 'OpenLattice Logo Icon',
  src: OpenLatticeLogo,
})`
  height: 26px;
`;

const AppTitle = styled.h1`
  color: ${NEUTRALS[0]};
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  margin: 0 0 0 10px;
`;

const LogoutButton = styled(Button)`
  font-size: 12px;
  line-height: 16px;
  margin-left: 30px;
  padding: 6px 29px;
`;

type Props = {
  actions :{
    logout :() => void;
  };
};

class AppHeaderContainer extends Component<Props> {

  renderLeftSideContent = () => (
    <LeftSideContentWrapper>
      <LogoTitleWrapperLink to={Routes.ROOT}>
        <AppLogoIcon />
        <AppTitle>
          OpenLattice React App
        </AppTitle>
      </LogoTitleWrapperLink>
      <AppNavigationContainer />
    </LeftSideContentWrapper>
  )

  renderRightSideContent = () => {

    const { actions } = this.props;
    return (
      <RightSideContentWrapper>
        <LogoutButton onClick={actions.logout}>
          Log Out
        </LogoutButton>
      </RightSideContentWrapper>
    );
  }

  render() {

    return (
      <AppHeaderOuterWrapper>
        <AppHeaderInnerWrapper>
          { this.renderLeftSideContent() }
          { this.renderRightSideContent() }
        </AppHeaderInnerWrapper>
      </AppHeaderOuterWrapper>
    );
  }
}

function mapStateToProps(state :Map<*, *>) :Object {

  return {
    isInitializingApplication: state.getIn(['app', 'isInitializingApplication'], false),
  };
}

function mapDispatchToProps(dispatch :Function) :Object {

  return {
    actions: bindActionCreators({ logout }, dispatch)
  };
}

// $FlowFixMe
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer)
);
