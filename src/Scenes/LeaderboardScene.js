import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getScores } from '../scoreAPI/scoreAPI';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.add
      .text(400, 100, 'LeaderBoard', {
        color: 'white',
        fontSize: '32px ',
      })
      .setOrigin(0.5, 0.5);

    getScores().then((scores) => {
      const { result } = scores;
      const scoreStyle = {
        color: 'white',
        fontSize: '38px ',
      };

      result.sort((x, y) => y.score - x.score);
      const space = 40;
      for (let i = 0; i < 5; i += 1) {
        if (result[i]) {
          this.add.text(
            60,
            200 + space * i,
            `${i + 1}. Name: ${result[i].user} -- Score: ${result[i].score}`,
            scoreStyle,
          );
        }
      }
    });

    this.gameButton = new Button(
      this,
      this.game.config.width * 0.25,
      this.game.config.height * 0.8,
      'yellowButton',
      'yellowButton',
      'Play',
      100,
      'Instruction',
    ).setScale(0.2);

    this.menuButton = new Button(
      this,
      this.game.config.width * 0.75,
      this.game.config.height * 0.8,
      'yellowButton',
      'yellowButton',
      'Menu',
      100,
      'Title',
    ).setScale(0.2);

    this.gameButton.on('click', () => {
      this.model = this.sys.game.globals.model;
      this.model.score = 0;
      this.scene.start('Guide');
    });
  }
}
