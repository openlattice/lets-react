/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import type { RequestSequence } from 'redux-reqseq';

import AppHeaderContainer from './AppHeaderContainer';
import Spinner from '../../components/spinner/Spinner';
import * as AppActions from './AppActions';
import * as Routes from '../../core/router/Routes';
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_WIDTH,
  APP_CONTENT_PADDING
} from '../../core/style/Sizes';

const APP_CONTENT_BG :string = '#f8f8fb';

const AppContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  min-width: ${APP_CONTAINER_WIDTH}px;
  padding: 0;
`;

const AppContentOuterWrapper = styled.main`
  background-color: ${APP_CONTENT_BG};
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  position: relative;
`;

const AppContentInnerWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  padding: ${APP_CONTENT_PADDING}px;
  position: relative;
`;

type Props = {
  initializeApplication :RequestSequence;
  isInitializingApplication :boolean;
};

class AppContainer extends Component<Props> {

  componentDidMount() {

    const { initializeApplication } = this.props;
    initializeApplication();
  }

  renderAppContent = () => {

    const { isInitializingApplication } = this.props;
    if (isInitializingApplication) {
      return (
        <Spinner />
      );
    }

    return (
      <Switch>
        <Route exact strict path={Routes.HOME} />
        <Route path="/tab1" render={() => null} />
        <Route path="/tab2" render={() => null} />
        <Redirect to={Routes.HOME} />
      </Switch>
    );
  }

  render() {

    return (
      <AppContainerWrapper>
        <AppHeaderContainer />
        <AppContentOuterWrapper>
          <AppContentInnerWrapper>
            { this.renderAppContent() }
          </AppContentInnerWrapper>
        </AppContentOuterWrapper>
      </AppContainerWrapper>
    );
  }
}

const mapStateToProps = (state :Map<*, *>) => ({
  isInitializingApplication: state.getIn(['app', 'isInitializingApplication']),
});

// $FlowFixMe
export default connect(mapStateToProps, { ...AppActions })(AppContainer);
