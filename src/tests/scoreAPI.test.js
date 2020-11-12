import { postScore, getScores } from '../scoreAPI/scoreAPI';

describe('save and retrive score from API', () => {
  it('save score to API', () => {
    postScore('Azeem', 20).then((data) => {
      expect(data).toBe('Leaderboard score created correctly.');
    });
  });
  it('retrieve leaderboard scores', () => {
    getScores().then((data) => {
      expect(typeof data).toBe('object');
      expect(data.result).toContainEqual('user');
    });
  });
});
