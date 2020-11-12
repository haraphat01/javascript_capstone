import Model from '../Model';

describe('sound', () => {
  const model = new Model();

  it('plays music', () => {
    expect(model.musicOn).toBe(true);
  });

  it('stops playing music', () => {
    model.musicOn = !model.musicOn;
    expect(model.musicOn).toBe(false);
  });

  it('plays sound', () => {
    expect(model.soundOn).toBe(true);
  });

  it('stops playing sound', () => {
    model.soundOn = !model.soundOn;
    expect(model.soundOn).toBe(false);
  });
});
