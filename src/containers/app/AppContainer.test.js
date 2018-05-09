import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AppContainer, HelloWorldComponent } from './AppContainer';
import * as Routes from '../../core/router/Routes';

describe('AppContainer', () => {

  let props;
  let mountAppContainer;

  const appContainer = (location = '/') => {
    if (!mountAppContainer) {
      mountAppContainer = mount(
        <MemoryRouter initialEntries={[location]}>
          <AppContainer {...props} />
        </MemoryRouter>
      );
    }
    return mountAppContainer;
  };

  beforeEach(() => {
    props = {
      actions: {
        login: () => {},
        logout: () => {}
      }
    };
    mountAppContainer = undefined;
  });

  it('always renders when mounted', () => {
    const wrapper = appContainer().find(AppContainer);
    expect(wrapper).toHaveLength(1);
  });

  it('renders Hello World upon root path', () => {
    const helloWorld = appContainer(Routes.ROOT).find(HelloWorldComponent);
    expect(helloWorld).toHaveLength(1);
  });

  it('renders Hello World upon random path', () => {
    const helloWorld = appContainer('/random').find(HelloWorldComponent);
    expect(helloWorld).toHaveLength(1);
  });

});
