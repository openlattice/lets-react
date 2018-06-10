/*
 * @flow
 */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { normalize } from 'polished';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { injectGlobal } from 'styled-components';

import AppContainer from './containers/app/AppContainer';
import initializeReduxStore from './core/redux/ReduxStore';
import initializeRouterHistory from './core/router/RouterHistory';
import * as Routes from './core/router/Routes';

// injected by Webpack.DefinePlugin
declare var __AUTH0_CLIENT_ID__ :string;
declare var __AUTH0_DOMAIN__ :string;
declare var __ENV_DEV__ :boolean;

/* eslint-disable */
injectGlobal`${normalize()}`;

injectGlobal`
  html,
  body {
    background-color: #f9fcff;
    color: #135;
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  #app {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
/* eslint-enable */

const routerHistory = initializeRouterHistory();
const reduxStore = initializeReduxStore(routerHistory);

ReactDOM.render(
  <Provider store={reduxStore}>
    <ConnectedRouter history={routerHistory}>
      <AppContainer path={Routes.ROOT} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
