/*
 * @flow
 */

import React, { useCallback, useEffect } from 'react';

import { AuthActions, AuthUtils } from 'lattice-auth';
import {
  AppContainerWrapper,
  AppContentWrapper,
  AppHeaderWrapper,
  AppNavigationWrapper,
  LatticeLuxonUtils,
  MuiPickersUtilsProvider,
  Spinner,
  StylesProvider,
  // $FlowIgnore
  ThemeProvider,
  lightTheme,
} from 'lattice-ui-kit';
import { LangUtils, useRequestState } from 'lattice-utils';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { RequestStates } from 'redux-reqseq';
import type { RequestState } from 'redux-reqseq';

import { INITIALIZE_APPLICATION, initializeApplication } from './actions';

import { OpenLatticeIconSVG } from '../../assets/svg/icons';
import { BasicErrorComponent } from '../../components';
import { APP } from '../../core/redux/constants';
import { Routes } from '../../core/router';

const { isNonEmptyString } = LangUtils;

const AppContainer = () => {

  const dispatch = useDispatch();

  const initAppRS :?RequestState = useRequestState([APP, INITIALIZE_APPLICATION]);

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  const userInfo = AuthUtils.getUserInfo() || {};
  let user :?string = null;
  if (isNonEmptyString(userInfo.name)) {
    user = userInfo.name;
  }
  else if (isNonEmptyString(userInfo.email)) {
    user = userInfo.email;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <MuiPickersUtilsProvider utils={LatticeLuxonUtils}>
        <StylesProvider injectFirst>
          <AppContainerWrapper>
            <AppHeaderWrapper appIcon={OpenLatticeIconSVG} appTitle="OpenLattice React App" logout={logout} user={user}>
              <AppNavigationWrapper>
                <NavLink to={Routes.ROOT} />
                <NavLink to="/tab1">Tab 1</NavLink>
                <NavLink to="/tab2">Tab 2</NavLink>
              </AppNavigationWrapper>
            </AppHeaderWrapper>
            {
              initAppRS === RequestStates.PENDING && (
                <AppContentWrapper>
                  <Spinner size="2x" />
                </AppContentWrapper>
              )
            }
            {
              initAppRS === RequestStates.FAILURE && (
                <AppContentWrapper>
                  <BasicErrorComponent>
                    Sorry, the application failed to initialize. Please try refreshing the page, or contact support.
                  </BasicErrorComponent>
                </AppContentWrapper>
              )
            }
            {
              initAppRS === RequestStates.SUCCESS && (
                <Switch>
                  <Route path="/tab1" render={() => (<AppContentWrapper>Tab 1</AppContentWrapper>)} />
                  <Route path="/tab2" render={() => (<AppContentWrapper>Tab 2</AppContentWrapper>)} />
                  <Redirect to="/tab1" />
                </Switch>
              )
            }
          </AppContainerWrapper>
        </StylesProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default AppContainer;
