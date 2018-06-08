/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import StyledCard from '../../components/cards/StyledCard';
import EDMcontainer from './DataListTableContainer';
import StyledButton from '../../components/buttons/StyledButton';
import DetailsContainer from './DetailsListTableContainer';

import { actionType } from '../../core/Constants/index';

// const AppWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   min-width: 800px;
//   position: relative;
// `;

// const AppHeaderOuterWrapper = styled.header`
//   display: flex;
//   flex: 0 0 auto;
//   flex-direction: row;
//   min-width: 800px;
//   position: relative;
// `;

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

const MainBody = (props :Props) => (
  <BodyWrapper>
    <NavBarWarp>
      <StyledButton onClick={props.actions.setListItems}>PropertyTypes</StyledButton>
      <StyledButton onClick={props.actions.setListItems}>EntityTypes</StyledButton>
      <StyledButton onClick={props.actions.setListItems}>AssociationTypes</StyledButton>
    </NavBarWarp>
    <TableContainer>
      <TableDiv>
        <EDMcontainer />
      </TableDiv>
      <TableDiv>
        <DetailsContainer />
      </TableDiv>
    </TableContainer>
  </BodyWrapper>
);

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

