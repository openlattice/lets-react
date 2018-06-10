/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import reduxActions from '../../core/redux/ReduxActions';
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

const mapStateToProps = (state :object) => {
  const getThisList = state.get('listItems');
  const fromState = state.get(getThisList);
  const activeIndex = state.get('activeItem');
  const item = fromState.length > activeIndex ? fromState[activeIndex] : [];
  return ({
    item,
    getDetails,
    setActiveItem: reduxActions.setActiveItem
  });
};

export default withRouter(
  connect(mapStateToProps, null)(DetailsContainer)
);

