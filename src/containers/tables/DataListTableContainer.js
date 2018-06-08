/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { actionType } from '../../core/Constants/index';

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

type Props = {
  actions :{
    clickItem :() => void;
    setActiveItem :() => void;
  };
  item :object;
  listItems :object;
};

const EDMcontainer = (props :Props) => (
  <StyledCard>
    <TableHeader />
    <Content>
      <DataListTable
          listItems={props.listItems}
          setActiveItem={props.actions.setActiveItem} />
    </Content>
  </StyledCard>
);

const setActiveItem = (id, itemIndex) => ({ type: actionType.UPDATE_ACTIVE_ITEM, itemIndex });

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
    setActiveItem
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
  listItems: state.get('listItems')
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EDMcontainer)
);

