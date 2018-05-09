import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import StyledButton from './StyledButton';

describe('StyledButton', () => {

  let props;
  let mountedStyledButton;

  const styledButton = () => {
    if (!mountedStyledButton) {
      mountedStyledButton = mount(
        <StyledButton {...props} />
      );
    }
    return mountedStyledButton;
  };

  beforeEach(() => {
    props = {

    };
    mountedStyledButton = undefined;
  });

  it('renders without throwing an error', () => {
    const tree = renderer.create(<StyledButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('always renders a button', () => {
    const buttons = styledButton().find('button');
    expect(buttons).toHaveLength(1);
  });

});
