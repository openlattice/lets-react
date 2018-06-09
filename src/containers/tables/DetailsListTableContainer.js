/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { actionType } from '../../core/Constants/index';

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
  setActiveItem :() => void;
  item :object;
};

const DetailsContainer = (props :Props) => (
  <StyledCard>
    <Content>
      <DetailsListTable
          item={props.item}
          getDetails={props.getDetails}
          setActiveItem={props.setActiveItem} />
    </Content>
  </StyledCard>
);
const setActiveItem = (id, itemIndex) => ({ type: actionType.UPDATE_ACTIVE_ITEM, itemIndex });

const mapStateToProps = (state :object, ownProps) => ({
  item: state.get('listItems')[state.get('activeItem')],
  getDetails,
  setActiveItem
});

export default withRouter(
  connect(mapStateToProps, null)(DetailsContainer)
);

