import React from 'react'
import { mount, shallow } from 'enzyme';
import {AppContainer} from './AppContainer';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('AppContainer', () => {

  let props;
  let mountedAppContainer;

  const appContainer = () => {
    if (!mountedAppContainer) {
      mountedAppContainer = mount(
        <AppContainer {...props} />
      )
    }
    return mountedAppContainer;
  }

  beforeEach(() => {
    props = {
      actions: {
        logout: () => {}
      }
    };
    mountedAppContainer = undefined;
  });

  it('always renders a div', () => {
    const divs = appContainer().find('div');
    console.log(divs);
    expect(divs.length).toBeGreaterThan(0);
  });

});