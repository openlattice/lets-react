import * as Routes from './Routes';

describe('routes', () => {

  test('should export the correct ROOT path', () => {
    expect(Routes.ROOT).toEqual('/');
  });

});
