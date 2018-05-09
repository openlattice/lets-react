import React from 'react'
import { mount } from 'enzyme';
import StyledCard from './StyledCard';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('StyledCard', () => {

  let props;
  let mountedStyledCard;

  const styledCard = () => {
    if (!mountedStyledCard) {
      mountedStyledCard = mount(
        <StyledCard {...props} />
      )
    }
    return mountedStyledCard;
  }

  beforeEach(() => {
    props = {

    };
    mountedStyledCard = undefined;
  });

  it('renders without throwing an error', () => {
    const tree = renderer.create(<StyledCard/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('always renders a div', () => {
    const divs = styledCard().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

});