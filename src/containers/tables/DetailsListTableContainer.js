/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import StyledCard from '../../components/cards/StyledCard';
import DetailsListTable from '../../components/tables/DetailsListTable';

const Content = styled.div`
    top: 50px;
    left: 0px;
    right: 0px;
    bottom: 0px;
`;

type Props = {
  actions :{
    login :() => void;
    logout :() => void;
    clickItem :() => void;
  };
  item :object;
};

const DetailsContainer = (props :Props) => (
  <StyledCard>
    <Content>
      <DetailsListTable
          item={props.item}
          clickItem={props.actions.clickItem} />
    </Content>
  </StyledCard>
);

const clickItem = () => {
  console.log('hi');
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
  item: state.get('listItems')[state.get('activeItem')]
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
);

