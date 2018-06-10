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
  background: ${colors.SELECTED};
  border-bottom: ${colors.BORDERS};
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  height: 70px;
  justify-content: center;
  position: relative;
  list-style-type: none;
  .active {
      color: ${colors.SLECTED_TEXT};
      font-weight: bold;
  }
  .passive {
      &:hover {
      }
  }
  a {
      text-decoration: none;
      color: ${colors.BASE_TEXT};
      &:hover {
          color: ${colors.SLECTED_TEXT};
      }
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
    color: ${colors.BASE_TEXT}
`;

// const Buttons = styled.div`
//     height: 70px;
//     font-size: 18px;
//     border-radius: 5px;
//     align-items: center;
//     text-align: center;
// `;

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
          <Padding>
            <div className={currentPage === 'property' ? 'active' : 'passive'}>PropertyTypes</div>
          </Padding>
        </Link>
        <Link to={Routes.ENTITY}>
          <Padding>
            <div className={currentPage === 'entity' ? 'active' : 'passive'}>EntityTypes</div>
          </Padding>
        </Link>
        <Link to={Routes.ASSOCIATION}>
          <Padding>
            <div className={currentPage === 'association' ? 'active' : 'passive'}>AssociationTypes</div>
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

