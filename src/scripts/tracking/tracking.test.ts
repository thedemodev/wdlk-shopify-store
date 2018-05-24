describe('tracking unit test', () => {
  const tracking = {
    google: true,
    facebook: true
  };
  test('tracking to be enabled', () => {
    expect(tracking).toEqual(
      expect.objectContaining({
        google: true,
        facebook: true
      })
    );
  });
});
