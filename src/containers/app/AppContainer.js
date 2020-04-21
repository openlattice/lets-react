/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import { AuthActions, AuthUtils } from 'lattice-auth';
import {
  AppContainerWrapper,
  AppContentWrapper,
  AppHeaderWrapper,
  AppNavigationWrapper,
  LatticeLuxonUtils,
  MuiPickersUtilsProvider,
  Spinner,
  ThemeProvider,
  lightTheme,
} from 'lattice-ui-kit';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { RequestStates } from 'redux-reqseq';
import type { RequestSequence, RequestState } from 'redux-reqseq';

import OpenLatticeIcon from '../../assets/images/ol_icon.png';
import * as AppActions from './AppActions';
import * as Routes from '../../core/router/Routes';
import { isNonEmptyString } from '../../utils/LangUtils';

const { INITIALIZE_APPLICATION } = AppActions;

const Error = styled.div`
  text-align: center;
`;

type Props = {
  actions :{
    initializeApplication :RequestSequence;
    logout :() => void;
  };
  requestStates :{
    INITIALIZE_APPLICATION :RequestState;
  };
};

class AppContainer extends Component<Props> {

  componentDidMount() {

    const { actions } = this.props;
    actions.initializeApplication();
  }

  logout = () => {

    const { actions } = this.props;
    actions.logout();

    // TODO: tracking
    // if (isFunction(gtag)) {
    //   gtag('config', GOOGLE_TRACKING_ID, { user_id: undefined, send_page_view: false });
    // }
  }

  renderAppContent = () => {

    const { requestStates } = this.props;

    if (requestStates[INITIALIZE_APPLICATION] === RequestStates.SUCCESS) {
      return (
        <Switch>
          <Route exact strict path={Routes.HOME} />
          <Route path="/tab1" render={() => (<AppContentWrapper>Tab 1</AppContentWrapper>)} />
          <Route path="/tab2" render={() => (<AppContentWrapper>Tab 2</AppContentWrapper>)} />
          <Redirect to={Routes.HOME} />
        </Switch>
      );
    }

    if (requestStates[INITIALIZE_APPLICATION] === RequestStates.FAILURE) {
      return (
        <AppContentWrapper>
          <Error>
            Sorry, something went wrong. Please try refreshing the page, or contact support.
          </Error>
        </AppContentWrapper>
      );
    }

    return (
      <AppContentWrapper>
        <Spinner size="2x" />
      </AppContentWrapper>
    );
  }

  render() {

    const userInfo = AuthUtils.getUserInfo();
    let user = null;
    if (isNonEmptyString(userInfo.name)) {
      user = userInfo.name;
    }
    else if (isNonEmptyString(userInfo.email)) {
      user = userInfo.email;
    }

    return (
      <ThemeProvider theme={lightTheme}>
        <MuiPickersUtilsProvider utils={LatticeLuxonUtils}>
          <AppContainerWrapper>
            <AppHeaderWrapper
                appIcon={OpenLatticeIcon}
                appTitle="OpenLattice React App"
                logout={this.logout}
                user={user}>
              <AppNavigationWrapper>
                <NavLink to={Routes.ROOT} />
                <NavLink to={Routes.HOME}>Home</NavLink>
                <NavLink to="/tab1">Tab 1</NavLink>
                <NavLink to="/tab2">Tab 2</NavLink>
              </AppNavigationWrapper>
            </AppHeaderWrapper>
            { this.renderAppContent() }
          </AppContainerWrapper>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state :Map<*, *>) => ({
  requestStates: {
    [INITIALIZE_APPLICATION]: state.getIn(['app', INITIALIZE_APPLICATION, 'requestState']),
  }
});

const mapActionsToProps = (dispatch :Function) => ({
  actions: bindActionCreators({
    initializeApplication: AppActions.initializeApplication,
    logout: AuthActions.logout,
  }, dispatch)
});

// $FlowFixMe
export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(AppContainer)
);
