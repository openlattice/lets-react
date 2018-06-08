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
type Props = {
  actions :{
    clickItem :() => void;
  };
  item :object;
};

const Content = styled.div`
    height: 600px;
    top: 50px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: scroll;
`;

const EDMcontainer = (props :Props) => (
  <StyledCard>
    <TableHeader />
    <Content>
      <DataListTable
          clickItem={props.actions.clickItem} />
    </Content>
  </StyledCard>
);

const clickItem = (id, index) => {
  console.log('hi', id, index);
};

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
    clickItem
    // getAllAssociationTypes,
    // getAllEntityTypes,
    // getAllPropertyTypes,
    // getAllSchemas
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const mapStateToProps = (state :object, ownProps) => ({
  item: { thing: 'yes' }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EDMcontainer)
);

