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
import { getDetails } from '../../utils/helperFunctions';

const Content = styled.div`
    top: 50px;
    left: 0px;
    right: 0px;
    bottom: 0px;
`;

type Props = {
  getDetails :() => void;
  item :object;
};

const DetailsContainer = (props :Props) => (
  <StyledCard>
    <Content>
      <DetailsListTable
          item={props.item}
          getDetails={props.getDetails} />
    </Content>
  </StyledCard>
);

// const fetchDetails = (text) => ({type: 'test', text})

function mapDispatchToProps(dispatch :Function) :Object {

  const actions = {
    getDetails
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const mapStateToProps = (state :object, ownProps) => ({
  item: state.get('listItems')[state.get('activeItem')],
  getDetails
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
);

