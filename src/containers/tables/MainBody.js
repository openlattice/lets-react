/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import EDMcontainer from './DataListTableContainer';
import DetailsContainer from './DetailsListTableContainer';
import * as Routes from '../../core/router/Routes';
import reduxActions from '../../core/redux/ReduxActions';
import { actionType, colors } from '../../core/Constants/index';

const NavBarWarp = styled.div`
  align-items: center;
  background-color: ${colors.BACKGROUND};
  border-bottom: ${colors.BORDERS};
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  height: 70px;
  justify-content: center;
  position: relative;
  list-style-type: none;
  .active {
      background: ${colors.SELECTED};
  }
  .passive {
      &:hover {
          background: ${colors.HOVER};
      }
  }
  a {
      text-decoration: none;
      color: darkblue;
  }
`;

const TableContainer = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: row;
    padding: 1em;
    min-width: 400px;
`;

const TableDiv = styled.div`
    min-width: 500px;
    width: 50%;
`;

const BodyWrapper = styled.div`
    width: 100%
`;

const Padding = styled.div`
    padding: 10px;
`;

type Props = {
    actions :{
        setListItems :() => void;
        setActiveItem :() => void;
    };
    location :() => void;
};

const MainBody = (props :Props) => {
  const currentPage = props.location.pathname.slice(1);

  props.actions.setListItems(currentPage);
  props.actions.setActiveItem('', 0);

  const renderHelper = () => (
    <TableContainer>
      <TableDiv>
        <EDMcontainer />
      </TableDiv>
      <TableDiv>
        <DetailsContainer />
      </TableDiv>
    </TableContainer>
  );

  return (
    <BodyWrapper>
      <NavBarWarp>
        <Link to={Routes.PROPERTY}>
          <Padding className={currentPage === 'property' ? 'active' : 'passive'}>
            <li>PropertyTypes</li>
          </Padding>
        </Link>
        <Link to={Routes.ENTITY}>
          <Padding className={currentPage === 'entity' ? 'active' : 'passive'}>
            <li>EntityTypes</li>
          </Padding>
        </Link>
        <Link to={Routes.ASSOCIATION}>
          <Padding className={currentPage === 'association' ? 'active' : 'passive'}>
            <li>AssociationTypes</li>
          </Padding>
        </Link>
      </NavBarWarp>
      <Switch>
        <Route path={Routes.PROPERTY} render={renderHelper} />
        <Route path={Routes.ENTITY} render={renderHelper} />
        <Route path={Routes.ASSOCIATION} render={renderHelper} />
        <Redirect to={Routes.PROPERTY} />
      </Switch>
    </BodyWrapper>
  );
};

const setListItems = (value) => {
  console.log('setListItems in MainBody');
  return ({ type: actionType.UPDATE_LIST, value });
};
// const setActiveItem = (id, itemIndex) => ({ type: actionType.UPDATE_ACTIVE_ITEM, itemIndex });

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
    setListItems,
    setActiveItem: reduxActions.setActiveItem
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(MainBody)
);

