/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import StyledCard from '../../components/cards/StyledCard';
import EDMcontainer from './DataListTableContainer';
import StyledButton from '../../components/buttons/StyledButton';
import DetailsContainer from './DetailsListTableContainer';
import * as Routes from '../../core/router/Routes';

import { actionType } from '../../core/Constants/index';

const NavBarWarp = styled.div`
  align-items: center;
  background-color: #fefefe;
  border-bottom: 1px solid #c5d5e5;
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  height: 70px;
  justify-content: center;
  position: relative;
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

const TableHeader = styled.div`
    height: 30px;
    background: grey;
`;

type Props = {
    actions :{
        setListItems :() => void;
    };
};

const MainBody = (props :Props) => {
  const renderHelper = () => {
    console.log('hi');
    return (
      <TableContainer>
        <TableDiv>
          <EDMcontainer />
        </TableDiv>
        <TableDiv>
          <DetailsContainer />
        </TableDiv>
      </TableContainer>
    );
  };
  return (
    <BodyWrapper>
      <NavBarWarp>
        <Link to={Routes.PROPERTY}>
          <StyledButton onClick={props.actions.setListItems}>PropertyTypes</StyledButton>
        </Link>
        <Link to={Routes.ENTITY}>
          <StyledButton onClick={props.actions.setListItems}>EntityTypes</StyledButton>
        </Link>
        <Link to={Routes.ASSOCIATION}>
          <StyledButton onClick={props.actions.setListItems}>AssociationTypes</StyledButton>
        </Link>
      </NavBarWarp>
      <Switch>
        <Route path={Routes.PROPERTY} render={renderHelper} />
        <Route path={Routes.ENTITY} render={renderHelper} />
        <Route path={Routes.ASSOCIATION} render={renderHelper} />
      </Switch>
    </BodyWrapper>
  );
};

const setListItems = e => ({ type: actionType.UPDATE_LIST, value: e.target.innerText });

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
    setListItems
    // getAllAssociationTypes,
    // getAllEntityTypes,
    // getAllPropertyTypes,
    // getAllSchemas
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(MainBody)
);

