import { TrackingManagerFactory } from './tracking';

describe('tracking', () => {
  const tracking = TrackingManagerFactory();

  test('tracking to be enabled', () => {
    expect(tracking).toMatchObject(
      expect.objectContaining({
        google: true,
        facebook: true
      })
    );
  });
  test('expect facebook tracking to be disabled', () => {
    tracking.disableTracking('facebook');
    expect(tracking).toMatchObject(
      expect.objectContaining({
        google: true,
        facebook: false
      })
    );
  });
  test('expect google tracking to be disabled', () => {
    tracking.disableTracking('google');
    expect(tracking).toMatchObject(
      expect.objectContaining({
        google: false,
        facebook: false
      })
    );
  });
});
