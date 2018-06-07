/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import StyledCard from '../../components/cards/StyledCard';
import DataListTable from '../../components/tables/DataListTable';

const TableHeader = styled.div`
    height: 30px;
    background: grey;
`;

const Content = styled.div`
    height: 600px;
    top: 50px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: scroll;
`;

const EDMcontainer = () => (
  <StyledCard>
    <TableHeader />
    <Content>
      <DataListTable />
    </Content>
  </StyledCard>
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
  connect(null, mapDispatchToProps)(EDMcontainer)
);

