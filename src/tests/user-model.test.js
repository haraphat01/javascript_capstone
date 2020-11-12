import Model from '../Model';

describe('Create and read the user', () => {
  it('create the user', () => {
    Model.user = 'Azeem';
    expect(Model.user).toBe('Azeem');
  });

  it('read the username', () => {
    expect(Model.user).toBe('Azeem');
  });
});
