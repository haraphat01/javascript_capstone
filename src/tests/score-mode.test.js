import Model from '../Model';

describe('Create and read scores', () => {
  it('read the score', () => {
    Model.score = 10;
    expect(Model.score).toBe(10);
  });

  it('set the score', () => {
    Model.score = 60;
    expect(Model.score).toBe(60);
  });
});
