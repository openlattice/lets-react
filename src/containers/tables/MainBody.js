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

const AppHeaderInnerWrapper = styled.div`
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

// const Title = styled.h1`
//   font-size: 28px;
//   font-weight: normal;
//   margin: 0;
// `;

// const StyledActionButton = StyledButton.extend`
//   position: absolute;
//   right: 50px;
// `;

// const Logo = styled.img`
//   position: absolute;
//   left: 50px;
// `;

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

const MainBody = () => (
  <BodyWrapper>
    <AppHeaderInnerWrapper>
      <StyledButton />
      <StyledButton />
      <StyledButton />
    </AppHeaderInnerWrapper>
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

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
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

