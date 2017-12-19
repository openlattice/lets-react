/*
 * @flow
 */

import Lattice from 'lattice';

// injected by Webpack.DefinePlugin
declare var __DEV__;

export function configureLattice(authToken :?string) :void {

  const { host } = window.location;
  const hostName :string = (host.startsWith('www.')) ? host.substring('www.'.length) : host;
  const baseUrl :string = (__DEV__) ? 'http://localhost:8080' : `https://api.${hostName}`;

  Lattice.configure({ authToken, baseUrl });
}

export function randomId() :string {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  // not meant to be a cryptographically strong random id
  return Math.random().toString(36).slice(2);
}
